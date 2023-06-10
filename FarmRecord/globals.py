
import typesense, random, string, subprocess


class GLOBALS :
    
    ''' GLOBAL VALUES '''
    colorList = ['blue', 'green', 'yellow', 'red', 'pink', 'purple', 'indigo', 'teal', 'cyan', 'sky', 'rose', 'fuchsia', 'orange', 'amber']
    session_name = 'user_session_details' 
    admin_session_name = 'admin_details'
    

    ''' RANDOM GENERATOR '''
    # andom ID generator
    def randID(self) : 
        try:
            id_length = 10
            characters = string.ascii_uppercase + string.ascii_lowercase + string.digits
            id = ''.join(random.choice(characters) for _ in range(id_length))
            return id
        except Exception as e:
            print(f'An exception occurred -- {e}')
    
    
    ''' SESSION HANDLING '''
    
    # session settings
    def setUserSession(self, request, session_name, session_options) :
        """
        This function performs some operation on two arguments.

        @param arg1 The first argument, which will be clled itself.
        @type arg1: obj

        @param arg2: it is the request.
        @type arg2: str
        
        @param arg3: it is the request.
        @type arg3: str
        
        @param arg4: it is the request.
        @type arg4: str

        @return: The result of the operation, which will be an integer.
        @rtype: int
        """
        try: 
            request.session[session_name] = session_options
            return 0
        except Exception as e:
            print("_Exception session create ", e)
            
    # get session
    def getUserSession(self, request, session_name) :
        try:  
            return request.session[session_name]
        except Exception as e:
            print("_Exception ", e)
    
    def destroyUserSession(self, request) :
        try:
            request.session.flush()
            request.session.clear() 
            request.session.clear_expired()
            return 0
        except Exception as e:
            print("_Exception ", e)
             
            
            
    ''' ADMIN GLOBALS '''
    
    # session settings
    def AdminsetSession(self, request, options) :
        try:
            request.session['user_details'] = options
            return 0
        except Exception as e:
            print("_Exception ", e)
            
    # get sessi0n
    def AdmingetSession(self, request) :
        try: 
            return request.session['user_details']
        except Exception as e:
            print("_Exception ", e)
    
    def AdminsessionDestroy(self, request) :
        try:
            request.session.flush()
            request.session.clear() 
            request.session.clear_expired()
            return 0
        except Exception as e:
            print("_Exception ", e)
 
    def test(self) :
        return 'dry rtrn'
 