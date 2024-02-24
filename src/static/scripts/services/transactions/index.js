import transactionCreate from "./transaction.create.service";
import transactionList from './transaction.list.service';
import transactionEdit from "./transaction.edit.service";

export default () =>{
    transactionCreate();
    transactionList();
    transactionEdit();
}