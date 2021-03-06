import React from 'react';
import ReactDOM from 'react-dom';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from 'react-crud-table';
import './index.css'

let requests = [
  {
    Id: 1,
    Item: 'Package 1',
    Qty: 3,
    Destination: 'Jakarta',
    Status: 'Verifying'
  },
  {
    Id: 2,
    Item: 'Package 2',
    Qty: 4,
    Destination: 'Bandung',
    Status: 'Verifying'
  },
];

let count = requests.length;
const service = {
  fetchItems: () => {
    let result = Array.from(requests);
    return Promise.resolve(result);
  },
  create: (request) => {
    count += 1;
    requests.push({
      ...request,
      Id: count,
    });
    return Promise.resolve(request);
  },
  update: (data) => {
    const request = requests.find(t => t.Id === data.Id);
    request.Item = data.Item;
    request.Qty =  data.Qty;
    request.Destination = data.Destination;
    return Promise.resolve(request);
  },
  delete: (data) => {
    const request = requests.find(t => t.Id === data.Id);
    requests = requests.filter(t => t.Id !== request.Id);
    return Promise.resolve(request);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Table = () => (
  <div style={styles.container}>
    <CRUDTable
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="Id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="Item"
          label="Item"
          placeholder="Item"
        />
         <Field
          name="Qty"
          label="Qty"
          placeholder="Qty"
        />
        <Field
          name="Destination"
          label="Destination"
          placeholder="Destination"
        />
        <Field
          name="Status"
          label="Status"
          hideInCreateForm
          readOnly
          hideInUpdateForm
        />
      </Fields>

      <CreateForm
        Item="Request Creation"
        message="Create a new request!"
        trigger="New request"
        onSubmit={request => service.create(request)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.Item) {
            errors.Item = 'Please, provide request\'s Item';
          }

          if (!values.Qty) {
            errors.Item = 'Please, provide request\'s Quantity';
          }

          if (!values.Destination) {
            errors.Destination = 'Please, provide request\'s Destination';
          }

          return errors;
        }}
      />

      <UpdateForm
        Item="Request Update Process"
        message="Update Request"
        trigger="Update"
        onSubmit={request => service.update(request)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.Item) {
            errors.Item = 'Please, provide request\'s Item';
          }

          if (!values.Qty) {
            errors.Item = 'Please, provide request\'s Quantity';
          }

          if (!values.Destination) {
            errors.Destination = 'Please, provide request\'s Destination';
          }


          return errors;
        }}
      />

      <DeleteForm
        Item="Request Delete Process"
        message="Are you sure you want to delete the request?"
        trigger="Delete"
        onSubmit={request => service.delete(request)}
        submitText="Delete"
      />
    </CRUDTable>
  </div>
);

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);

