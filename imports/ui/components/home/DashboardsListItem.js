import React from 'react';
import i18n from 'meteor/universe:i18n';
import { gql, graphql, compose } from 'react-apollo';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';
import { Card, CardMedia } from 'material-ui/Card';
import { white, transparent, grey600 } from 'material-ui/styles/colors';

const styles = {
  card: {
    media: {
      cursor: 'pointer',
      minHeight: '180px',
    },
  },
  dashboardName: {
    input: {
      fontSize: '1.3em',
      color: white,
      padding: '0px 12px',
    },
    underlineStyle: {
      borderColor: transparent,
      marginLeft: '10px',
      width: '95%',
    },
    underlineFocusStyle: {
      borderColor: white,
      marginLeft: '10px',
      width: '95%',
    },
  },
  buttons: {
    remove: {
      root: {
        position: 'absolute',
        top: '5px',
        right: '5px',
      },
    },
    actions: {
      root: {
        position: 'absolute',
        top: '5px',
        right: '35px',
      },
    },
  },
};

const DashboardItem = ({ context, dashboard, copyDashboard, renameDashboard, deleteDashboard }) => {
  const { FlowRouter, Notificator } = context();
  const { id } = dashboard;

  const goToDashboard = e => {
    if (e.target.tagName === 'DIV') FlowRouter.go('dashboard', { dashboardId: id });
  }

  const deleteDashboardFn = () => {
    const callMethod = () => deleteDashboard(id).then(res => {
      if (res.errors) Notificator.snackbar(res.errors);
    });

    const confirm = {
      message: 'Are you sure you want to permanently delete this dashboard?',
      options: {
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        title: 'Delete dashboard',
        confirmFunction: callMethod,
      },
    };

    const { message, options } = confirm;
    Notificator.interaction(message, options);
  }

  const copyDashboardFn = () => {
    copyDashboard(id);
  }

  const renameDashboardFn = e => {
    const name = e.currentTarget.value;
    renameDashboard(id, name);
  }

  return !dashboard ? null : (
    <Card>
      <CardMedia
        style={styles.card.media}
        onTouchTap={goToDashboard}
        overlay={
          <TextField
            name="chartName"
            fullWidth
            defaultValue={dashboard.name}
            onBlur={renameDashboardFn}
            inputStyle={styles.dashboardName.input}
            underlineStyle={styles.dashboardName.underlineStyle}
            underlineFocusStyle={styles.dashboardName.underlineFocusStyle}
          />
        }
      >
        <img src="/images/background-min.jpg" alt={dashboard.name} />
      </CardMedia>

      <IconButton
        style={styles.buttons.remove.root}
        tooltip={i18n.__('delete')}
        onTouchTap={deleteDashboardFn}
      >
        <DeleteIcon color={grey600} />
      </IconButton>
      <IconMenu
        style={styles.buttons.actions.root}
        iconButtonElement={
          <IconButton tooltip={i18n.__('actions')}><MoreVertIcon color={grey600} /></IconButton>
        }
      >
        <MenuItem
          primaryText={i18n.__('copy')}
          onTouchTap={copyDashboardFn}
          leftIcon={<ContentCopyIcon color={grey600} />}
        />
      </IconMenu>
    </Card>
  );
};

// >>> DATA / ACTIONS CONTAINER
const COPY_DASHBOARD_MUTATION = gql`
  mutation CopyDashboard($id: String!) {
    copyDashboard(id: $id) {
      id
      name
      users {
        id
        createdAt
        emails {
          address
          verified
        }
      }
    }
  }
`;

const RENAME_DASHBOARD_MUTATION = gql`
  mutation RenameDashboard($id: String!, $name: String!) {
    renameDashboard(id: $id, name: $name) {
      id
      name
      users {
        id
        createdAt
        emails {
          address
          verified
        }
      }
    }
  }
`;

const DELETE_DASHBOARD_MUTATION = gql`
  mutation DeleteDashboard($id: String!) {
    deleteDashboard(id: $id) {
      _id
    }
  }
`;

const withCopyDashboardMutation = graphql(COPY_DASHBOARD_MUTATION, {
  name: 'copyDashboardMutation',
  props: ({ copyDashboardMutation }) => ({
    copyDashboard: id => copyDashboardMutation({
      variables: { id },
      updateQueries: {
        Dashboards: (prevData, { mutationResult }) => ({
          ...prevData,
          dashboards: [...prevData.dashboards, mutationResult.data.copyDashboard],
        }),
      }
    }),
  }),
});

const withRenameDashboardMutation = graphql(RENAME_DASHBOARD_MUTATION, {
  name: 'renameDashboardMutation',
  props: ({ renameDashboardMutation }) => ({
    renameDashboard: (id, name) => renameDashboardMutation({
      variables: { id, name },
      updateQueries: {
        Dashboards: (prevData, { mutationResult }) => {
          const prevDashboards = prevData.dashboards.filter(x => x.id != id);
          return {
            ...prevData,
            dashboards: [...prevDashboards, mutationResult.data.renameDashboard],
          };
        },
      }
    }),
  }),
});

const withDeleteDashboardMutation = graphql(DELETE_DASHBOARD_MUTATION, {
  name: 'deleteDashboardMutation',
  props: ({ deleteDashboardMutation }) => ({
    deleteDashboard: id => deleteDashboardMutation({
      variables: { id },
      updateQueries: {
        Dashboards: (prevData, { mutationResult }) => {
          const nextDashboards = prevData.dashboards.filter(x => x.id !== id);
          return {
            ...prevData,
            dashboards: nextDashboards,
          };
        },
      }
    })
  }),
});

export default compose(
  withCopyDashboardMutation,
  withRenameDashboardMutation,
  withDeleteDashboardMutation,
)(DashboardItem);
// <<< DATA / ACTIONS CONTAINER
