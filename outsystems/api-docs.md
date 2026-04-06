# Create User API

This endpoint creates a new user.

## Endpoint
POST https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/users

Example Input (Body): 
{
  "UserName": "",
  "UserEmail": "",
  "UserPhoneNo": "",
  "UserBankAccount": "",
  "UserQualifications": ""
}

Example Output: 
{
  "UserId": 0,
  "Success": false,
  "Message": ""
}

# Get Client Profile API

This endpoint retrieves the profile of a client.

## Endpoint
GET https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/users/{UserId}/client-profile

Example Input (URL): 
UserId (integer)

Example Output: 
{
  "UserId": 0,
  "UserName": "",
  "UserEmail": "",
  "ClientRating": 0.1,
  "VerificationStatus": "",
  "Success": false,
  "Message": ""
}

# Update Client Profile API

This endpoint updates the profile of a client.

## Endpoint
PATCH https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/users/{UserId}/client-profile

Example Input (URL): 
UserId (integer)

{
  "ClientRating": 0.1,
  "VerificationStatus": ""
}

Example Output: 
{
  "Success": false,
  "Message": ""
}

# Get Freelancer Profile API

This endpoint retrieves the profile of a freelancer.

## Endpoint
GET https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/users/{UserId}/freelancer-profile

Example Input (URL): 
UserId (integer)

Example Output: 
{
  "UserId": 0,
  "UserName": "",
  "UserEmail": "",
  "FreelancerRating": "",
  "FreelancerStatus": "",
  "FreelancerSkills": "",
  "FreelancerExperince": "",
  "Success": false,
  "Message": ""
}

# Update Freelancer Profile API

This endpoint updates the profile of a freelancer.

## Endpoint
PATCH https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/users/{UserId}/freelancer-profile

Example Input (URL): 
UserId (integer)

{
  "FreelancerRating": 0.1,
  "FreelancerStatus": "",
  "FreelancerSkills": "",
  "FreelancerExperience": ""
}

Example Output: 
{
  "Success": false,
  "Message": ""
}

# Get Bank Details API

This endpoint retrieves the bank details of a user.

## Endpoint
GET https://personal-c46vfcmj.outsystemscloud.com/UserService/rest/UserAPI/GetBankDetails?UserId={UserId}

Example Input (URL Query): 
UserId (integer)

Example Output: 
{
  "UserId": 0,
  "UserBankAccount": "",
  "Success": false,
  "Message": ""
}