import { Component, OnInit } from '@angular/core';
import {SimpleWallet, Password, NetworkTypes, NEMLibrary, Address, TransferTransaction, Transaction, TimeWindow,
  EmptyMessage, MultisigTransaction, PublicAccount, TransactionHttp, XEM} from "nem-library";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    title = 'nem wallet';
    newWalletPassword: string;
    newWalletName: string;
    wallet: any;
    openWalletName: string;
    openWalletPassword: string;
    openWalletPrivateKey: string;

    constructor() {
      NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    }

    ngOnInit() {

    }

    createWallet() {
      const password = new Password(this.newWalletName);
      const simpleWallet = SimpleWallet.create(this.newWalletName, password);
      console.log(simpleWallet);
      this.wallet = simpleWallet;
      alert("Name: " + this.wallet.name + ". Address: " + this.wallet.address.value)
    }

    openWallet() {

      const password = new Password(this.openWalletPassword);
      const privateKey = this.wallet.unlockPrivateKey(password);
      console.log(privateKey);
      const simpleWallet = SimpleWallet.createWithPrivateKey(this.openWalletName, password, privateKey);
      const account = simpleWallet.open(password);
      console.log(account);

    }

    send() {
      const transferTransaction: Transaction = TransferTransaction.create(
        TimeWindow.createWithDeadline(),
        new Address("TCFFOM-Q2SBX7-7E2FZC-3VX43Z-TRV4ZN-TXTCGW-BM5J"),
        new XEM(2),
        EmptyMessage
      );
      console.log(transferTransaction);
    }

}
