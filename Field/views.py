from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
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
    if (g.session_name not in request.session) :
        return redirect('/auth')
    
    return render(request, 'pages/index.html')
    
@csrf_exempt
def dashboard_view(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
    
    return render(request, 'pages/dashboard.html')

@csrf_exempt
def add_work_view(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')
     
    return render(request, 'pages/addWork.html')

@csrf_exempt
def all_work_disply(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth')

    return render(request, 'pages/viewWork.html') 



