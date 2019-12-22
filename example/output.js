const yup = require('yup');

const TypeTestingSchema = yup.object().shape({
  string: yup.string(),
  requiredString: yup.string().required(),
  array: yup.array().of(yup.string()),
  arrayInnerRequired: yup.array().of(yup.string().required()),
  arrayOuterRequired: yup
    .array()
    .of(yup.string())
    .required(),
  arrayAllRequired: yup
    .array()
    .of(yup.string().required())
    .required(),
  arrayOfObject: yup.array().of(
    yup
      .object()
      .shape({ string: yup.string() })
      .default(null)
      .nullable()
  ),
  arrayOfObjectReq: yup
    .array()
    .of(yup.object().shape({ string: yup.string() })),
  arrayOfObjectReqArr: yup
    .array()
    .of(
      yup
        .object()
        .shape({ string: yup.string() })
        .default(null)
        .nullable()
    )
    .required(),
  arrayOfEnumerable: yup.array().of(yup.mixed.oneOf(['Foo', 'Bar'])),
  object: yup
    .object()
    .shape({ string: yup.string() })
    .default(null)
    .nullable(),
  objectRequired: yup.object().shape({ string: yup.string() }),
  enumerable: yup.mixed.oneOf(['Foo', 'Bar']),
  enumberableRequired: yup.mixed.oneOf(['Foo', 'Bar']).required()
});
