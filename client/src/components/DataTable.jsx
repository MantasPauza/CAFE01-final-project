//create a table that accepts data from form, uses sqlite to store data, and has a delete and edit buttons


 const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { addData, deleteData, editData })(DataTable);




