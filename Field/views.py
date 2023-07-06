from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.serializers import serialize
from django.core.files.storage import FileSystemStorage
from .models import Work
from FarmRecord.globals import GLOBALS 
import os, json, requests
fs = FileSystemStorage()
g = GLOBALS()
 
# Create your views here.

# dashboard page view
@csrf_exempt
def index_view(request) : 
    return render(request, 'pages/index.html')
 


################################################### backend functionality goes here  ######################################################################
 
@csrf_exempt
def save_work(request) :
    try:    
        data = json.loads(request.body) 
        work_id = g.randID() 
        
        # work_heading = request.POST.get('work_heading') 

        # user_id = g.getUserSession(request, g.session_name)['id'] 
                               
        Work.objects.create(
            work_id=work_id, 
            work_heading=data.get('workHeading'), 
            work_desc=data.get('workDescription'), 
            work_location=data.get('workLocation'), 
            work_amount=data.get('workAmount'), 
            added_at=data.get('addedAt'),
        )

        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Saved !'}}))
 

    except FileNotFoundError as e:
        print('sw FileNotFoundError --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'FileNotFoundError'}}))
    except Exception as e:
        print('sw Exception --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Exception !'}}))

        
@csrf_exempt
def edit_work(request) :
    try:   
        data = json.loads(request.body)
        id = data.get('pk')
        

        w = Work.objects.get(id=id)
        w.work_heading = data.get('workHeading')
        w.work_desc = data.get('workDescription')
        w.work_location = data.get('workLocation')
        w.work_amount = data.get('workAmount')
        w.edited_at = data.get('editedAt')
                
        w.save()
        
        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Edited Successfully !'}}))
 

    except FileNotFoundError as e:
        print('ew FileNotFoundError --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'FileNotFoundError'}}))
    except Exception as e:
        print('ew Exception --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Exception !'}}))

@csrf_exempt
def delete_work(request) :
    try:   
        data = json.loads(request.body) 
        workid = data.get('pk')
        w = Work.objects.get(id=workid)
        w.delete()
        
        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Work Deleted Successfully !'}}))
 
    except Exception as e:
        print('dw Exception --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Exception !'}}))
    

@csrf_exempt
def view_all_work(request):
    try:
        querySet = Work.objects.all()
        data = serialize('json', querySet)

        return JsonResponse(data, safe=False)

    except Exception as e:
        print('vaw Exception --> ', e)
        return JsonResponse({'success': False, 'data': {'alertMsg': 'Exception!', 'exception': str(e)}})


