# hookformx

Using [Schema-Typed](https://github.com/rsuite/schema-typed) for data modeling ,Using React hook for Building material forms.
support TextField、Date/Time、Seclects、Checkboxes、RadioGroup、Switches  Material Component 
<img src="https://i.loli.net/2019/09/25/9xQUVJXmiaEGbfW.gif" />
## Installation

```
npm install hookformx --save
```

## Usage

```js
import { SchemaModel, StringType, DateType, NumberType, useFormx } from 'hookformx';

const loginFormSchema = SchemaModel({
  account:StringType().isRequired('account required ').minLength(3, 'should not be less than 3'),
  pwd:StringType().isRequired('password required').maxLength(20, 'pwd do not need be greater than 20')
});

const checkResult = loginFormSchema.check({
  account: 'test',
  pwd: '12345678910111213141516'
});

console.log(checkResult);
```

`checkResult` return structure is:

```js
{
    hasError: true,
    account: { hasError: false },
    pwd: { hasError: true, errorMessage: 'pwd do not need be greater than 20' }
}
```

## Use form Hook for material

```js
const login = () => {
  const { useInput, isValid,values,errors } = useFormx({
    account:'test',
    pwd:'test'
    }, loginFormSchema,() = {
      console.log(values);
      console.log(errors)
      });
  return (
    <TextField {...useInput('account','change')} />
    <TextField {...useInput('pwd','blur')} />
    <Button color="primary" variant="contained" disabled={isValid}>  login  </Button>
  )
}
```
 the useFormx hook have three params:first initial value, the second param is schema type have define above,the third param is a callback function.
 the return useFormX is :
 ```js
 {
    values, //form values
    useInput,
    errors, //form current errors
    isValid,  //use for disable submitbutton
    handleSubmit //callback function when the form submit
  }
  ```
the return useInput is :
```js
{
    value,          // field value
    required,       // required?
    defaultValue,   // default field value
    onFocus:        // default onFocus function
    error:          //fieldValues
    helperText:     //field errorMessage
    onBlur:         // default onBlur function
    onChange:       // default onChange function
  }
```

## More About Verification
- Read [Schema-Typed](https://github.com/rsuite/schema-typed) for more help

it add errors property hasError is very useful for disable the button
 


