class CustomError extends Error {
  constructor (statusCode, resultMsg, resultCode = null) {
    if (typeof resultMsg === 'object') {
      try {
        resultMsg = JSON.stringify(resultMsg);
      } catch (e) {
        console.error(e);
      }
    }
    super(resultMsg);
    this.statusCode = statusCode || 400;
    this.resultCode = resultCode || 'BAD_REQUEST';
    this.resultMsg = resultMsg || 'Bad request';
  }
}


class BadRequestError extends CustomError {
  constructor (resultMsg) {
    super(400, resultMsg, 'BAD_REQUEST');
  }
}

class UnauthorizedError extends CustomError {
  constructor (resultMsg) {
    super(401, resultMsg, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends CustomError {
  constructor (resultMsg = 'Forbidden') {
    super(403, resultMsg, 'FORBIDDEN');
  }
}

class NotFoundError extends CustomError {
  constructor (resultMsg = 'Not found') {
    super(404, resultMsg, 'NOT_FOUND');
  }
}


class ConflictError extends CustomError {
  constructor (resultMsg = 'Conflict') {
    super(409, resultMsg, 'CONFLICT');
  }
}

class UnprocessableEntityError extends CustomError {
  constructor (resultMsg = 'Unprocessable Entity') {
    super(422, resultMsg, 'UNPROCESSABLE_ENTITY');
  }
}

class MandatoryFieldError extends CustomError {
  constructor (field) {
    const resultMsg = `Mandatory field: ${field} not provided`;
    super(422, resultMsg, 'COMMON_FIELD_MANDATORY');
  }
}

class InvalidValueError extends CustomError {
  constructor (value, field, labelCode) {
    const resultMsg = `Incorrect value ${value} for field ${field} provided`;
    super(422, resultMsg, `COMMON_${labelCode}_INVALID_VALUE`);
  }
}

class BadGatewayError extends CustomError {
  constructor (resultMsg) {
    super(502, resultMsg, 'BAD_GATEWAY');
  }
}
class CommonBadGatewayError extends CustomError {
  constructor (resultMsg) {
    super(502, resultMsg, 'COMMON_BAD_GATEWAY');
  }
}
class InternalServerError extends CustomError {
  constructor (resultMsg) {
    super(500, resultMsg, 'INTERNAL_SERVER_ERROR');
  }
}

module.exports = {
  CustomError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  UnprocessableEntityError,
  MandatoryFieldError,
  BadGatewayError,
  CommonBadGatewayError,
  InternalServerError,
  InvalidValueError
};
