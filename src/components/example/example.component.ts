import { LitElement, html, css, CSSResultArray, CSSResultOrNative } from 'lit';


export class ExampleComponent extends LitElement {
  static shadowRootOptions = {...LitElement.shadowRootOptions, mode: <ShadowRootMode> 'open'};
  request: any;

  toggle = false;

  static styles = css`
      .main-title {
      text-align: center;
      font-size: 24px;
      border: 1px solid #grey;
      margin: 0;
      padding-top: 50px;
      }

      .screen {
          height: 100%;
          width: 100%;
          background: #5cb9db;
          font-family: Helvetica, Sans-Serif;
      }
      .container input {
          display:block;
          padding: 10px;
          width: 200px;
      }
      .text-muted{
          font-style: italic;
      }
      button {
          margin : 20px 0;
          padding: 10px 20px;
      }
      .btn-primary {
          background: green;
          border: none;
          color: white;
          margin-right: 10px;
      }
      .btn-sec {
          border: none;
      }
      pre {
        font-size: 18px;
        padding: 40px;
        background: lightyellow;
      }
  `;

    onAddPayment() {
      this.toggle = true;
      console.log("Add payment has been clicked");
      this.request = {
        name: (this.renderRoot?.querySelector('#cc-name') as HTMLInputElement).value,
        number: (this.renderRoot?.querySelector('#cc-number') as HTMLInputElement).value,
        expiration: (this.renderRoot?.querySelector('#cc-expiration') as HTMLInputElement).value,
        cvv:(this.renderRoot?.querySelector('#cc-cvv') as HTMLInputElement).value,
      }
      // @ts-ignore: Object is possibly 'null'.
      this.renderRoot.querySelector('#json').innerHTML = "Succesfully saved " + JSON.stringify(this.request)
      
      console.log(this.request)
      //http call to save the paymentd details
    }

    onCancel() {
      this.toggle = false;
      console.log("Cancel payment has been clicked");
      (this.renderRoot?.querySelector('#cc-name') as HTMLInputElement).value = '';
      (this.renderRoot?.querySelector('#cc-number') as HTMLInputElement).value = '';
      (this.renderRoot?.querySelector('#cc-expiration') as HTMLInputElement).value = '';
      (this.renderRoot?.querySelector('#cc-cvv') as HTMLInputElement).value = '';

      // @ts-ignore: Object is possibly 'null'.
      this.renderRoot.querySelector('#json').innerHTML = '';
    }

    render() {
        return html`
        <div class="screen">
          <h4 class="main-title">Payments Portal</h4>
          <div style="padding: 60px;">
            <h4 class="mb-3">Add Payments</h4>
            <div class="d-block my-3">
              <div>
                <input id="credit" name="paymentMethod" type="radio" checked required>
                <label class="custom-control-label" for="credit">Credit card</label>
              </div>
              <div>
                <input id="debit" name="paymentMethod" type="radio" required>
                <label class="custom-control-label" for="debit">Debit card</label>
              </div>
              <div>
                <input id="paypal" name="paymentMethod" type="radio" required>
                <label class="custom-control-label" for="paypal">Paypal</label>
              </div>
            </div>
            <div class="row">
              <div class="container">
                <label for="cc-name">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="">
                <small class="text-muted">Full name as displayed on card</small>
              </div>
              <div class="container">
                <label for="cc-number">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="">
              </div>
            </div>
            <div class="row">
              <div class="container">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="">
              </div>
              <div class="container">
                <label for="cc-expiration">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="">
              </div>
            </div>
            <button class="btn-primary" @click="${this.onAddPayment}">Save</button>
             <button class="btn-sec" @click="${this.onCancel}">Cancel</button>
          </div>
          <pre id="json">
            
          </pre>
        </div>
        `;
    }
}
