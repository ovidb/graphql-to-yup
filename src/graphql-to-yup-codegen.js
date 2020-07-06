const getScalarType = (type, required) => {
  let value = 'yup.';
  switch (type.name) {
    case 'ID':
    case 'String':
      value += 'string()';
      break;
    case 'Float':
      value += 'number()';
      break;
    case 'Int':
      value += 'number().integer()';
      break;
    case 'Boolean':
      value += 'boolean()';
      break;
  }
  return `${value}${required ? '.required()' : ''}`;
};

const getListType = (type, required) => {
  return `yup.array().of(${analyzeField(type)})${required ? '.required()' : ''}`;
};

const getEnumType = (type, required) => {
  return `yup.mixed().oneOf([${type
    .getValues()
    .map(obj => `'${obj.value}'`)
    .join(',')}])${required ? '.required()' : ''}`;
};

const getObjectType = (type, required) => {
  let result = 'yup.object().shape({ ';
  const fields = type.getFields();
  for (const fieldName in fields) {
    result += `${fieldName}: ${analyzeField(fields[fieldName].type)}, `;
  }
  result += ` })${required ? '' : '.default(null).nullable()'}`;
  return result;
};

const analyzeField = (type, required) => {
  switch (type.__proto__.constructor.name) {
    case 'GraphQLNonNull':
      return analyzeField(type.ofType, true);
    case 'GraphQLScalarType':
      return getScalarType(type, required);
    case 'GraphQLList':
      return getListType(type.ofType, required);
    case 'GraphQLEnumType':
      return getEnumType(type, required);
    case 'GraphQLInputObjectType':
      return getObjectType(type, required);
  }
};

module.exports = {
  plugin: (schema, documents, config) => {
    const { inputTypeNames } = config;

    let output = `import * as yup from 'yup';\n\n`;
    inputTypeNames.forEach(typeName => {
      const type = schema.getType(typeName);

      if (type) {
        output += `export const ${typeName}Schema = ${analyzeField(schema.getType(typeName), true)};\n\n`;
      }
    });

    return output;
  },
};
