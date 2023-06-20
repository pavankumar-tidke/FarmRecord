from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseServerError  
from Auth.models import MUser, Admin
import json, random, typesense  
from FarmRecord.globals import GLOBALS 
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
ph = PasswordHasher()
g = GLOBALS()


'''Create your views here.'''

# user login & signup page
def auth_page(request) :
    if (g.session_name not in request.session) :
        return render(request, 'pages/auth.html')
        # return render(request, 'pages/loading.html')
    return redirect('/')


@csrf_exempt
def set_session(request) :
    
    user = {
        'id': request.POST.get('id'),
        'name': request.POST.get('name'),
        'email': request.POST.get('email'),
    }
     
    g.setUserSession(request, g.session_name, user)
    
    return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'session set success !', 'redirect_url': '/'}}))
    
    
# admin login & signup page
@csrf_exempt
def admin_auth_page(request) :
    if (g.admin_session_name not in request.session) :
        return render(request, 'pages/adminAuth.html') 
    return redirect('/a/') 



# user Authentication sign up & sign in action 
@csrf_exempt
def authenticate_user(request) : 

    try:
        email = request.POST.get('email')
        
        if request.POST.get('operation')  == 'signup' :  

            # searching username from the PostgreSQl DB
            if MUser.objects.filter(email=email).exists() == False :      

                # user signup logic
                name = request.POST.get('name')    
                hash = ph.hash(request.POST.get('password'))   
                ## inserting the data in our postgresql DB  ##
                MUser.objects.create(name=name, email=email, password=hash).save()  
                # g.setUserSession(request, g.session_name, {'id': user.id, 'name': user.name, 'email': user.email}) 
                return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Account Created !', 'redirect_url': '/'}}))

            else :
                return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'This email is alread exists, Use different email !'}}))
        
        else:  
            # user login logic   
            if MUser.objects.filter(email=email).exists() :
                print('got email')
                user = MUser.objects.get(email=email)
                if ph.verify(user.password, request.POST.get('password')) :
                    print('got passwd')
                    g.setUserSession(request, g.session_name, {'id': user.id, 'name': user.name, 'email': user.email})
                    userDetails = {'id': user.id, 'name': user.name, 'email': user.email}
                    return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'error': False, 'data': {'alertMsg': 'qweqr', 'user': userDetails, 'redirect_url': '/'}}))                    
                else :
                    return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': "Wrong 'email' or 'password' !", 'redirect_url': None}}))
            else : 
                return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': "Wrong 'email' or 'password' !", 'redirect_url': None}})) 
    
    except VerifyMismatchError as VerifyMissMatch:  
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Invalid Credentials', 'redirect_url': None}}))   
    except NameError as nameError: 
        print('Auth Excp :- ', nameError)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'nameError', 'redirect_url': None}}))  
    except TypeError as typeError: 
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'typeError', 'redirect_url': None}}))  
    except ValueError as valueError:  
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'valueError', 'redirect_url': None}}))          
    except Exception as ise:  
        print('Auth Excp :- ', ise)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Excp', 'redirect_url': None}}))   



# logout 
def user_logout(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
    g.destroyUserSession(request)
    return redirect('/auth')




''' ADMIN SECTION '''
@csrf_exempt
def admin_authenticate(request) : 

    try:
        email = request.POST.get('email')
        
        if request.POST.get('operation')  == 'signup' : 
            # collecting all data  
            name = request.POST.get('name')    
            hash = ph.hash(request.POST.get('password'))  
            
                # searching username from the PostgreSQl DB
            if Admin.objects.filter(email=email).exists() == False :      
                
                ## inserting the data in our postgresql DB  ##
                Admin.objects.create(name=name, email=email, password=hash).save()
                # g.setUserSession(request, 'user_session', email)
                return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Account created successfully, Login Now !', 'redirect_url': ''}}))

            else :
                return HttpResponse(json.dumps({'success': False, 'errorMsg': 'Admin Email Exists !', 'error': True, 'data': None}))
        
        else:  
            # user login logic   
            if Admin.objects.filter(email=email).exists() :
                print('got email')
                user = Admin.objects.get(email=email)
                if ph.verify(user.password, request.POST.get('password')) :
                    print('got passwd')
                    g.setUserSession(request, g.admin_session_name, {'id': user.id, 'name': user.name, 'email': user.email})
                    return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'error': False, 'data': {'alertMsg': 'qweqr', 'redirect_url': '/a'}}))                    
                else :
                    return HttpResponse(json.dumps({'success': False, 'errorMsg': 'Invalid Credentials1 !', 'data': {'alertMsg': 'Invalid Credentials !', 'redirect_url': None}}))
            else : 
                return HttpResponse(json.dumps({'success': False, 'errorMsg': 'Invalid Credentials2 !', 'data': {'alertMsg': 'Invalid Credentials !', 'redirect_url': None}})) 
    
    except VerifyMismatchError as VerifyMissMatch:  
        return HttpResponse(json.dumps({'success': False, 'errorMsg': 'Invalid Credentials3', 'data': {'alertMsg': 'Invalid Credentials !', 'redirect_url': None}}))   
    except NameError as nameError: 
        return HttpResponse(json.dumps({'success': False, 'errorMsg': 'nameError', 'data': {'alertMsg': 'nameError', 'redirect_url': None}}))  
    except TypeError as typeError: 
        return HttpResponse(json.dumps({'success': False, 'errorMsg': 'typeError', 'data': {'alertMsg': 'typeError', 'redirect_url': None}}))  
    except ValueError as valueError:  
        return HttpResponse(json.dumps({'success': False, 'errorMsg': 'valueError', 'data': {'alertMsg': 'valueError', 'redirect_url': None}}))          
    except Exception as ise:  
        return HttpResponse(json.dumps({'success': False, 'errorMsg': ise, 'data': {'alertMsg': ise, 'redirect_url': None}}))   




# logout 
def admin_logout(request) :
    if (g.admin_session_name not in request.session) :
        return redirect('/auth/authadmin')
    g.destroyAdminSession(request)
    return redirect('/auth/authadmin')




