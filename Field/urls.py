from django.urls import path
from . import views


#URLConf
urlpatterns = [
    
    # rendering Page routes
    path(route='', view=views.index_view, name=''),
    path(route='dashboard/', view=views.dashboard_view, name='dashboard'),
    path(route='aw/', view=views.add_work_view, name='aw'),
    path(route='vw/', view=views.all_work_disply, name='vw'),
    
    # functionality routes    
    path(route='sw/', view=views.save_work, name='aw'),
    path(route='ew/', view=views.edit_work, name='ew'),
    path(route='fetch/all_work/', view=views.view_all_work, name='vaw'),
     
]  

