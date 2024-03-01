import transactionCreate from "./transaction.create.service";
import transactionList from './transaction.list.service';
import transactionEdit from "./transaction.edit.service";
import transactionClone from "./transaction.clone.service";

export default () =>{
    transactionCreate();
    transactionList();
    transactionEdit();
    transactionClone();
}