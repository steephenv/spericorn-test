import * as express from 'express';

import { searchEmpRules } from './validators/search-employee-rules';
import { addEmpRules } from './validators/add-employee-rules';
// import { isLoggedIn } from '../utils/isLoggedIn';

import { addEmployee } from './add-employee';
import { searchEmployee } from './search-employee';
import { listEmployee } from './list-employees';

export const employee = express.Router();

employee.post('/add-employee', addEmpRules, addEmployee);
employee.post('/search-employee', searchEmpRules, searchEmployee);
employee.get('/list-employee', listEmployee);
