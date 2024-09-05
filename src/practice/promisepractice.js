class Promise1 {
  constructor(executor) {
    this.onResolve;
    this.onReject;
    this.isCalled = false;
    this.value;
    this.error;
    this.fullFilled = false;
    this.rejected = false;
    const resolve = (res) => {
      if (this.fullFilled || this.rejected) return;

      this.fullFilled = true;
      this.value = res;
      if (typeof this.onResolve === "function" && !this.isCalled) {
        this.onResolve(res);
        this.isCalled = true;
      }
    };
    const reject = (err) => {
      if (typeof this.onReject === "function" && !this.isCalled) {
        this.onReject(err);
        this.isCalled = true;
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err); // If an error is thrown during execution, reject the promise
    }
  }

  then(thenHandler) {
    this.onResolve = thenHandler;
    if (this.fullFilled && !this.isCalled) {
      this.onResolve(this.value);
      this.isCalled = true;
    }
    return this;
  }
  catch(catchHandler) {
    this.onReject = catchHandler;
    return this;
  }
}
const p = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 100);
});
p.then((res) => console.log(res));

const p2 = Promise.resolve(2);
p2.then((res) => console.log(res));
