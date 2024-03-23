export const onlyNumbers = (event)=>{
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  }
  