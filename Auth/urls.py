from django.urls import path
from . import views

#URLConf
urlpatterns = [
    
    # User Autentication route
    path(route='authenticateUser/', view=views.authenticate_user, name='user_authentication'), 
    # user logout route
    path('userlogout/', views.user_logout, name='logout_user'),
    
    
    
    # admin Autentication route
    path(route='authenticateAdmin/', view=views.admin_authenticate, name=''),
    # admin logout route
    path('adminlogout/', views.admin_logout, name=''),


]   