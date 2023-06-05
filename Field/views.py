from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# dashboard page
@csrf_exempt
def dashboard(request) :
    return render(request, 'pages/dashboard.html')