import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/*
<div *ngVar="false as variable">
      <span>{{variable | json}}</span>
</div>
or

<div *ngVar="false; let variable">
    <span>{{variable | json}}</span>
</div>
or

<div *ngVar="45 as variable">
    <span>{{variable | json}}</span>
</div>
or

<div *ngVar="{ x: 4 } as variable">
    <span>{{variable | json}}</span>
</div>
*/

@Directive({
  selector: '[ngVar]'
})
export class NgVarDirective 
{

  constructor(
      private templateRef: TemplateRef<any>,
      private vcRef: ViewContainerRef
  ) {}

  @Input()
    set ngVar(context: unknown) {
        this.context.$implicit = this.context.ngVar = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: unknown;
        ngVar: unknown;
    } = {
        $implicit: null,
        ngVar: null,
    };

    private hasView: boolean = false;
}
