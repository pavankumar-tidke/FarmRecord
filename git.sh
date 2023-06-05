#! /usr/bin/bash

 
#####################################################################

# COPYRIGHT (C) 2023 Pavankumar Tidke
# All rights reserved.
#
# This script is licensed under the MIT Licence.
# For details, see the .

#####################################################################
 
COMMIT_NAME=$1

display_msg() {
    echo ">>-----------> "" $1 """ 
}

echo "
                                                         c=====e
                                                            H
   ____________                                         _,,_H__
  (__((__((___()                                       //|     |
 (__((__((___()()_____________________________________// |ACME |
(__((__((___()()()------------------------------------'  |_____|
"

# Change to the local code directory
display_msg "Reaching to the Directory..."
LOCAL_CODE_DIR=$(pwd)
cd "$LOCAL_CODE_DIR" || return


# Define the repository URL and the local code directory
display_msg "Gathering information about git..."
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

#  git adding
display_msg "Op-1 :- adding..."
git add . > /dev/null 2>&1

# Commit the changes
display_msg "Op-2 :- commiting - $COMMIT_NAME..."
git commit -m "$COMMIT_NAME" --no-verify > /dev/null 2>&1

# # Add the remote repository and push the code
display_msg "Op-3 :- pushing to - $BRANCH_NAME..."
git push origin "$BRANCH_NAME" --no-verify > /dev/null 2>&1

# success message
display_msg "Operation successful. "
