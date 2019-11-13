import React, { PureComponent } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllEmployees, getEmployee } from '../../actions/employee/actions';
import PropTypes from 'prop-types';
import styles from './stylesheets/main.css';
import withStyles from 'isomorphic-style-loader/withStyles';

class Employees extends PureComponent {

   constructor(props) {
      super(props);
      this.state = {
         employees: []
      }
   }

   componentDidMount() {
      this.props.getAllEmployees();
   }

   render() {
      const { employees } = this.props.employee;
      console.log(employees);
      var list = employees.map((employee, index) =>
         <ListGroupItem key={index}>{employee}</ListGroupItem>
      )
      return (
         <div className="container">
            <p className="title">List of knowit consultants</p>
            <br />
            <ListGroup>
               {list}
            </ListGroup>
         </div>
      );
   }
}

/**
 * Property mapping for redux state handling. 
 */
Employees.propTypes = {
   getAllEmployees: PropTypes.func.isRequired,
   getEmployee: PropTypes.func.isRequired,
   employee: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   employee: state.employee
});

export default connect( mapStateToProps, { getAllEmployees, getEmployee }) (withStyles(styles)(Employees));