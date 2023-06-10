from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .models import Work
from FarmRecord.globals import GLOBALS 
import os, json
fs = FileSystemStorage()
g = GLOBALS()
 
# Create your views here.

# dashboard page view
@csrf_exempt
def index_view(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
    
    return render(request, 'pages/index.html')
def dashboard_view(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
    
    return render(request, 'pages/dashboard.html')

# event / work / anything which is happened  registration page view
@csrf_exempt
def add_work_view(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
    
    print(os.environ.get('DATABASE_URL'))
    return render(request, 'pages/addWork.html')




################################################### backend functionality goes here  ######################################################################

@csrf_exempt
def save_work(request) :
    try:   
        
        files = request.FILES.getlist('work_reciept')     
        work_id = g.randID()
        work_reciept = []

        user_id = g.getUserSession(request, g.session_name)['id']
        
        # Images uploading to the folder 

        for file in files :  
            newFileName = fs.save(f'./{user_id}/work_reciept/work_id_{work_id}/' + file.name, file)
            work_reciept.append(os.path.basename(newFileName))                    
            
            
        Work.objects.create(
            work_id=work_id,
            work_reciept=work_reciept, 
            work_heading=request.POST.get('work_heading'), 
            work_desc=request.POST.get('work_desc'), 
            work_location=request.POST.get('work_location'), 
            work_amount=request.POST.get('work_amount'), 
            created_at=request.POST.get('currTime')
        )

        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Saved !'}}))

    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': e}))
    














