from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseServerError  
from Auth.models import User, Admin
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



