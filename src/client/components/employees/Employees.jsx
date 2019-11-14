import React from 'react';
import styles from './stylings.css';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getAllEmployees } from '../../actions/employee.action';

class Employees extends React.PureComponent {
   
   componentDidMount() {
      this.props.getAllEmployees();
   }

   render() {
      const { employees } = this.props.employees;
      console.log(employees);
      return (
         <div className={styles.container}>
            <p className={styles.title}>List of employees</p>
            <br />
            <ListGroup>
               {employees.map((employee, idx) => <ListGroupItem key={idx}>{employee}</ListGroupItem>)}
            </ListGroup>
         </div>
      );
   }
}

Employees.propTypes = {
   employees: PropTypes.arrayOf(PropTypes.string.isRequired),
   getAllEmployees: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
   employees: state.employees,
});

export default connect( mapStateToProps, { getAllEmployees }) (withStyles(styles)(Employees));