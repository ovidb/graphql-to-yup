# Plugin for graphql-codegen to Generate Yup schema from GraphQL

Currently only works with `input` types

##*Usage*

### Install
If you want to run it from your project:
```
npm install --save-dev @ovidb/graphql-to-yup
```

you could also install it globally:
```
npm install -g @ovidb/graphql-to-yup
```

### Setup using `codegen.yml`

You will need to create a `codegen.yml` file
```yaml
schema: point/to/your/schema.graphql
generates:
  the-output-file.js:
    plugins:
      - @ovidb/graphql-to-yup
    config:
      inputTypeNames:
        - TheTypesYouWantToGenerateSchemaFor
        - AnotherInputType
```
