import { Observable,BehaviorSubject, map, distinctUntilChanged } from "rxjs";

export class Store<T>{

    state$: Observable<T>;
    private _state$:  BehaviorSubject<T>;


    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable();
    }

    get state() {
        return this._state$.getValue();
    }

    protected setState(nextState: T): void{
        console.log('---------------------------');
        console.log('Previous State',this.state);
        this._state$.next(nextState);
        console.log('---------------------------');
        console.log('Current State',this.state);
        console.log('---------------------------');
        console.log('---------------------------');
    }
    select<T>(selectorFunction: any): Observable<T>{
        return this.state$.pipe(
            distinctUntilChanged(),
            map(selectorFunction)
        )
    }
} 