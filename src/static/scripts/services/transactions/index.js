import transactionCreate from "./transaction.create.service";
import transactionList from './transaction.list.service';

export default () =>{
    transactionCreate();
    transactionList();
}