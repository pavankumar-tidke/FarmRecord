from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.core.files.storage import FileSystemStorage
from .models import Work
from Auth.models  import MUser 
from api.globals import GLOBALS 
import os, json
fs = FileSystemStorage()
g = GLOBALS()
 
# Create your views here.

################################################### backend functionality goes here  ######################################################################

def save_file(file):
    try:
        # Get the file name
        file_name = file.name

        # Define the path to the upload folder
        upload_folder = 'path/to/upload/folder'

        # Create the full file path
        file_path = os.path.join(upload_folder, file_name)

        # Save the file to the upload folder
        with open(file_path, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Return True to indicate successful file saving
        return True
    
    except Exception as e:
        # Handle any exceptions and return False to indicate file saving failure
        return False

@csrf_exempt
def save_work(request) :
    try:   
        work_heading = request.POST.get('work_heading')
        files = request.FILES.getlist('work_reciept')     
        work_id = g.randID()
        work_reciept = []

        user_id = int(request.POST.get('user_id'))  
          
        for file in files :  
            newFileName = fs.save(f'./user_id_{user_id}/work_title_{work_heading}/' + file.name, file)
            work_reciept.append(os.path.basename(newFileName))                    
            
            
        Work.objects.create(
            work_id=work_id,
            work_reciept=work_reciept, 
            work_heading=work_heading, 
            work_desc=request.POST.get('work_desc'), 
            work_location=request.POST.get('work_location'), 
            work_amount=request.POST.get('work_amount'), 
            added_at=request.POST.get('currTime'),
            MUser_id=user_id
        )

        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Saved !'}}))


    except FileNotFoundError as e:
        print('FileNotFoundError --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'FileNotFoundError'}}))
    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Exception !'}}))
    

@csrf_exempt
def view_all_work(request) :

    user_id = request.POST.get('user_id')
    querySet = Work.objects.filter(MUser=user_id) 
    data = serialize('json', querySet)
    
    return JsonResponse(data, safe=False)
    
    # return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Saved !', 'all_work': all_work}}))








