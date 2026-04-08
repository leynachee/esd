import requests

SUPPORTED_HTTP_METHODS = {"GET", "POST", "PUT", "DELETE", "PATCH"}

def invoke_http(url, method='GET', json=None, **kwargs):
    """A simple HTTP client wrapper around requests."""
    code = 200
    result = {"message": "Service reached"}

    try:
        if method.upper() not in SUPPORTED_HTTP_METHODS:
            raise Exception("HTTP method not supported")

        response = requests.request(method, url, json=json, **kwargs)
        
        # Check if response is JSON
        try:
            result = response.json()
        except ValueError:
            result = response.text

        code = response.status_code
    except Exception as e:
        code = 500
        result = {"message": f"Invocation failed: {str(e)}"}

    return result, code