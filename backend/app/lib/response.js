
class Response {
  constructor (res, code, body, customHeaders = null) {
    const headers = {
      'Content-Type': 'application/json',
      ...(customHeaders || {})
    };

    if (typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return res.status(code).header(headers).json(body);
  }
}

class ErrorResponse extends Error {
  constructor (resultCode, resultMsg) {
    super(resultMsg);
    this.resultCode = resultCode;
    this.resultMsg = resultMsg;
  }
}


const responseOK = (res, body, customHeaders = null) => {
  return new Response(res, 200, body, customHeaders);
};
const responseCreated = (res, customHeaders = null) => {
  return new Response(res, 204, {}, customHeaders);
};

const responseError = (res, error) => {
  console.error(error);

  const statusCode = error.statusCode || 400;
  const resultCode = error.resultCode || 'BAD_REQUEST';
  const resultMsg = error.resultMsg || 'Bad request';

  return new Response(res, statusCode, new ErrorResponse(resultCode, resultMsg));
};

module.exports = {
  Response,
  responseOK,
  responseCreated,
  responseError
};
