export default class Utilities {
    $timeout: ng.ITimeoutService;

    static $inject = [
        '$timeout'
    ]

    constructor($timeout: ng.ITimeoutService) {
        this.$timeout = $timeout;
    }

    debounce(func: Function, wait: number): Function {
        let previousTimeoutPromise: ng.IPromise<any>;

        return (...args: any[]) => {
            if (previousTimeoutPromise) {
                this.$timeout.cancel(previousTimeoutPromise);
            }

            previousTimeoutPromise = this.$timeout(() => func(...args), wait);
        }
    }
}