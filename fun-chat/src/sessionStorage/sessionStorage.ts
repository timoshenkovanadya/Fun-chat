export class SessionStorage {
    checkIsLogged() {
        return !!sessionStorage.getItem('login') && !!sessionStorage.getItem('password');
    }

    logout() {
        sessionStorage.clear();
    }

    submit(inputFirst: string, inputSecond: string) {
        sessionStorage.setItem('login', inputFirst);
        sessionStorage.setItem('password', inputSecond);
    }
}