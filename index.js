//---------------------------------------------------------------------
// github        https://github.com/noctcloud/noctjs-validator
// organization  Noct Cloud
// author        Sansnn
// license       MIT
//---------------------------------------------------------------------

"use strict";

// jsonschema校验器
const Validator = require('jsonschema').Validator;
const util = require('./util');

module.exports = class validator {

	static data({
		data,
		schema,
		options
	}) {
		data = util.parseData({
			data,
			schema,
			name: 'data'
		});
		let validate = new Validator().validate(data, schema, options);
		let errors = validate.errors.map(err => util.translate(err, schema));
		return {
			result: validate,
			data,
			errors
		}
	}

}
