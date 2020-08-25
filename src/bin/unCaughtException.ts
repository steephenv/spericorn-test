// handle uncaught exception
process.on('uncaughtException', async error => {
  // tslint:disable:no-console
  console.log('########################################\n');
  console.log(error);
  console.trace(error);
  console.log('\n########################################\n');
});
