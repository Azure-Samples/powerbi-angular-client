export default class Utilities {
    $timeout: ng.ITimeoutService;
    
    static $inject = [
        '$timeout'
    ]
    
    constructor($timeout) {
        this.$timeout = $timeout;
    }
    
    debounce(func: Function, wait: number): Function {
        let previousTimeoutPromise;
        
        return (...args) => {
            if(previousTimeoutPromise) {
                this.$timeout.cancel(previousTimeoutPromise);
            }
            
            previousTimeoutPromise = this.$timeout(() => func(...args), wait);
        }
    }
}