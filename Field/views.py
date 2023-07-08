from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.serializers import serialize
from django.core.files.storage import FileSystemStorage
from .models import Work, ProdWork
from FarmRecord.globals import GLOBALS 
import os, json, requests
fs = FileSystemStorage()
g = GLOBALS()
 
# Create your views here.

# dashboard page view
@csrf_exempt
def index_view(request) : 
    return render(request, 'pages/index.html')
 
@csrf_exempt
def check_connection(request) : 
    try :
        return JsonResponse({'success': True, 'data': {'alertMsg': 'Connection Successful !'}})
    
    except Exception as e:
        print('cc Exception --> ', e)
        return JsonResponse({'success': False, 'data': {'alertMsg': 'Connection Error'}})

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
def add_production(request) :
    try:    
        data = json.loads(request.body) 
        prod_id = g.randID() 
        
                 
        ProdWork.objects.create(
            prod_id=prod_id, 
            crop_name=data.get('crop_name'),
            crop_desc=data.get('crop_desc'),
            crop_weight=data.get('crop_weight'),
            crop_amount=data.get('crop_amount'),
            sell_location=data.get('sell_location'),
            added_at=data.get('addedAt'),
        )

        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': 'Crop Data Saved !'}}))
 

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
        content = data.get('content') 
        
        pk = data.get('pk')
        
        if content == 'edit' :
            w = Work.objects.get(id=pk) 
            w.work_heading = data.get('workHeading')
            w.work_desc = data.get('workDescription')
            w.work_location = data.get('workLocation')
            w.work_amount = data.get('workAmount')
            w.added_at = data.get('addedAt')
            w.edited_at = data.get('editedAt')                
            w.save()
        
        elif content == 'prodedit' :
            w = ProdWork.objects.get(id=pk)
            w.crop_name = data.get('cropName')
            w.crop_desc = data.get('cropDesc')
            w.crop_weight = data.get('cropWeight')
            w.crop_amount = data.get('cropAmount')
            w.sell_location = data.get('cropLocation')
            w.added_at = data.get('addedAt')
            w.edited_at = data.get('editedAt')
            w.save()
            
        else :
            print('invalid content')
            
        message = "Work" if data.get('content') == "edit" else "Production"
        
        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': f'{message} Edited Successfully !'}}))
 

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

        pk = data.get('pk')
        temp = Work.objects.get(id=pk) if data.get('content') == 'view' else (ProdWork.objects.get(id=pk) if data.get('content') == 'prodview' else print('invalid content'))
        temp.delete()
        message = "Work" if data.get('content') == "view" else "Production"
        
        return HttpResponse(json.dumps({'success': True, 'data': {'alertMsg': f'{message} Deleted Successfully !'}}))
 
    except Exception as e:
        print('dw Exception --> ', e)
        return HttpResponse(json.dumps({'success': False, 'data': {'alertMsg': 'Exception !'}}))


@csrf_exempt
def view_all_work(request):
    try:
        workQuerySet = Work.objects.all()
        prodWorkQuerySet = ProdWork.objects.all()
        workData = serialize('json', workQuerySet)
        prodWorkData = serialize('json', prodWorkQuerySet)

        combinedData = {
            'success': True,
            'workData': json.loads(workData),
            'prodWorkData': json.loads(prodWorkData)
        }

        return JsonResponse(json.dumps(combinedData), safe=False)

    except Exception as e:
        print('vaw Exception --> ', e)
        return JsonResponse({'success': False, 'data': {'alertMsg': 'Exception!', 'exception': str(e)}})


