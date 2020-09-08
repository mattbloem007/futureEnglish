import { login, isAuthenticated, getProfile } from "../../utils/auth"
import React from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'


import {
  DialogContent,
  Grid,
  Typography,
  Box,
  Fade,
  CircularProgress,
  Badge,
  Avatar,
  Fab,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
  Divider,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  Photo as PhotoIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  PersonOutline as PersonOutlineIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  AccessTime as AccessTimeIcon,
  DeleteForever as DeleteForeverIcon,
} from "@material-ui/icons";

const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },

  badge: {
    top: theme.spacing(2),
    right: -theme.spacing(2),
  },

  loadingBadge: {
    top: "50%",
    right: "50%",
  },

  avatar: {
    marginRight: "auto",
    marginLeft: "auto",

    width: theme.spacing(14),
    height: theme.spacing(14),
  },

  nameInitials: {
    cursor: "default",
  },

  personIcon: {
    fontSize: theme.spacing(7),
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    minHeight: "initial",
  },
})

const initialState = {
  profileCompletion: 0,
  securityRating: 0,
  showingField: "",
  avatar: null,
  avatarUrl: "",
  firstName: "",
  lastName: "",
  username: "",
  emailAddress: "",
  performingAction: false,
  emailVerified: false,
  loadingAvatar: false,
  sentVerificationEmail: false,
  errors: null,
};

let user = null;
let email = "";

class Account extends React.Component {

  constructor(props) {
      super(props);
      this.state = initialState;

  }

  getNameInitialsOrIcon = () => {

    if (!user) {
      return null;
    }

    const {classes} = this.props

    // if (!userData) {
    //   return <PersonIcon className={classes.personIcon} />;
    // }

    const nameInitials = user.student_name.charAt(0)

    if (nameInitials) {
      return (
        <Typography className={classes.nameInitials} variant="h2">
          {nameInitials}
        </Typography>
      );
    }

    return <PersonIcon className={classes.personIcon} />;
  };

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId,
    });
  };

  hideFields = (callback) => {
    this.setState(
      {
        showingField: "",
        firstName: "",
        lastName: "",
        username: "",
        emailAddress: "",
        errors: null,
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  changeFirstName = () => {
   const { firstName } = this.state;

   this.setState(
     {
       errors: null,
     },
     () => {

       if (firstName === user.student_name.split(" ")[0]) {
         return;
       }

       this.setState(
         {
           performingAction: true,
         },
         () => {
           /** API CALL AUTH TO CHANGE NAME */
         }
       );
     }
   );
 };

 changeLastName = () => {
  const { lastName } = this.state;

  this.setState(
    {
      errors: null,
    },
    () => {

      if (lastName === user.student_name.split(" ")[1]) {
        return;
      }

      this.setState(
        {
          performingAction: true,
        }
      );
    }
  );
};

changeUsername = () => {
 const { username } = this.state;

 this.setState(
   {
     errors: null,
   },
   () => {

     if (username === user.student_name) {
       return;
     }

     this.setState(
       {
         performingAction: true,
       }
     );
   }
 );
};

changeEmailAddress = () => {
 const { email } = this.state;

 this.setState(
   {
     errors: null,
   },
   () => {

     if (email === email) {
       return;
     }

     this.setState(
       {
         performingAction: true,
       }
     );
   }
 );
};

changeField = (fieldId) => {
    switch (fieldId) {
      case "first-name":
        this.changeFirstName();
        return;

      case "last-name":
        this.changeLastName();
        return;

      case "username":
        this.changeUsername();
        return;

      case "email-address":
        this.changeEmailAddress();
        return;

      default:
        return;
    }
  };

  handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === "Escape") {
      this.hideFields();
    } else if (key === "Enter") {
      this.changeField(fieldId);
    }
  };

  handleAvatarChange = (event) => {
      if (!event) {
        return;
      }

      const files = event.target.files;

      if (!files) {
        return;
      }

      const avatar = files[0];

      if (!avatar) {
        return;
      }

      const fileTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];

      if (!fileTypes.includes(avatar.type)) {
        return;
      }

      if (avatar.size > 20 * 1024 * 1024) {
        return;
      }

      this.setState({
        avatar: avatar,
        avatarUrl: URL.createObjectURL(avatar),
      });
    };

    handleFirstNameChange = (event) => {
    if (!event) {
      return;
    }

    const firstName = event.target.value;

    this.setState({
      firstName: firstName,
    });
  };

  handleLastNameChange = (event) => {
    if (!event) {
      return;
    }

    const lastName = event.target.value;

    this.setState({
      lastName: lastName,
    });
  };

  handleUsernameChange = (event) => {
    if (!event) {
      return;
    }

    const username = event.target.value;

    this.setState({
      username: username,
    });
  };

  handleEmailAddressChange = (event) => {
    if (!event) {
      return;
    }

    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress,
    });
  };


  componentWillMount = async () => {
    user = getProfile()
    email = user.email
    this.setState({avatarUrl: user.picture, emailAddress: email, emailVerified: user.email_verified})
    user = user['https://app.io/user_metadata']
    console.log(user)
  //  await this.fetchProducts()
  }

  componentDidMount = () => {
    user = getProfile()
    email = user.email
    this.setState({avatarUrl: user.picture, emailAddress: email, emailVerified: user.email_verified})
    user = user['https://app.io/user_metadata']

  }


  render() {
    const {classes} = this.props

    const {
      profileCompletion,
      securityRating,
      showingField,
      performingAction,
      loadingAvatar,
      avatar,
      avatarUrl,
      firstName,
      lastName,
      username,
      emailAddress,
      emailVerified,
      sentVerificationEmail,
      errors,
    } = this.state;

    const hasFirstName = user && user.student_name.split(" ")[0];
    const hasLastName = user && user.student_name.split(" ")[1];
    const hasUsername = user && user.student_name.split;
    console.log(avatarUrl)

    return (
      <Layout color="#90BDDF">
        <SEO title="Profile | FEA" desc="This is Future English Academy" />
        <Box mb={2}>
         <Hidden xsDown>
           <Grid alignItems="center" container>
             <Grid item xs>
               <Box textAlign="center">
                 <Box mb={1.5}>
                   { avatarUrl && (
                     <Badge
                       classes={{ badge: classes.badge }}
                       badgeContent={
                         <Tooltip title="Remove">
                           <Fab
                             classes={{ sizeSmall: classes.small }}
                             color="secondary"
                             disabled={performingAction}
                             size="small"
                             onClick={this.removeAvatar}
                           >
                             <CloseIcon fontSize="small" />
                           </Fab>
                         </Tooltip>
                       }
                     >
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <Fade
                               style={{ transitionDelay: "1s" }}
                               in={loadingAvatar}
                               unmountOnExit
                             >
                               <CircularProgress size={120} thickness={1.8} />
                             </Fade>
                           }
                         >
                           <Avatar
                             className={classes.avatar}
                             alt="Avatar"
                             src={avatarUrl}
                           />
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar
                           className={classes.avatar}
                           alt="Avatar"
                           src={avatarUrl}
                         />
                       )}
                     </Badge>
                   )}

                   {!avatar && !avatarUrl && (
                     <>
                       {avatarUrl && (
                         <Badge
                           classes={{ badge: classes.badge }}
                           badgeContent={
                             <Tooltip title="Remove">
                               <Fab
                                 classes={{ sizeSmall: classes.small }}
                                 color="secondary"
                                 disabled={performingAction}
                                 size="small"
                                 onClick={this.removeAvatar}
                               >
                                 <CloseIcon fontSize="small" />
                               </Fab>
                             </Tooltip>
                           }
                         >
                           {loadingAvatar && (
                             <Badge
                               classes={{ badge: classes.loadingBadge }}
                               badgeContent={
                                 <Fade
                                   style={{ transitionDelay: "1s" }}
                                   in={loadingAvatar}
                                   unmountOnExit
                                 >
                                   <CircularProgress
                                     size={120}
                                     thickness={1.8}
                                   />
                                 </Fade>
                               }
                             >
                               <Avatar
                                 className={classes.avatar}
                                 alt="Avatar"
                                 src={avatarUrl}
                               />
                             </Badge>
                           )}

                           {!loadingAvatar && (
                             <Avatar
                               className={classes.avatar}
                               alt="Avatar"
                               src={avatarUrl}
                             />
                           )}
                         </Badge>
                       )}

                       {!avatarUrl && (
                         <>
                           {loadingAvatar && (
                             <Badge
                               classes={{ badge: classes.loadingBadge }}
                               badgeContent={
                                 <Fade
                                   style={{ transitionDelay: "1s" }}
                                   in={loadingAvatar}
                                   unmountOnExit
                                 >
                                   <CircularProgress
                                     size={120}
                                     thickness={1.8}
                                   />
                                 </Fade>
                               }
                             >
                               <Avatar className={classes.avatar} alt="Avatar">
                                 {this.getNameInitialsOrIcon()}
                               </Avatar>
                             </Badge>
                           )}

                           {!loadingAvatar && (
                             <Avatar className={classes.avatar} alt="Avatar">
                               {this.getNameInitialsOrIcon()}
                             </Avatar>
                           )}
                         </>
                       )}
                     </>
                   )}
                 </Box>

                 {avatar && avatarUrl && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     startIcon={<CloudUploadIcon />}
                     variant="contained"
                     onClick={this.uploadAvatar}
                   >
                     Upload
                   </Button>
                 )}

                 {!avatar && !avatarUrl && (
                   <>
                     <input
                       id="avatar-input"
                       type="file"
                       hidden
                       accept="image/*"
                       onChange={this.handleAvatarChange}
                     />

                     <label htmlFor="avatar-input">
                       <Button
                         color="primary"
                         component="span"
                         disabled={performingAction}
                         startIcon={<PhotoIcon />}
                         variant="contained"
                       >
                         Choose...
                       </Button>
                     </label>
                   </>
                 )}
               </Box>
             </Grid>

             {/**<Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Profile completion</Typography>

                 {profileCompletion === 0 && (
                   <Typography color="error" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion === 100 && (
                   <Typography color="primary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion !== 0 && profileCompletion !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
               </Box>
             </Grid>*/}

             {/**<Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Security rating</Typography>

                 {securityRating === 0 && (
                   <Typography color="error" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating === 100 && (
                   <Typography color="primary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating !== 0 && securityRating !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
               </Box>
             </Grid>*/}
           </Grid>
         </Hidden>

         <Hidden smUp>
           <Box textAlign="center" mb={3}>
             <Box mb={1.5}>
               {avatar && avatarUrl && (
                 <Badge
                   classes={{ badge: classes.badge }}
                   badgeContent={
                     <Tooltip title="Remove">
                       <Fab
                         classes={{ sizeSmall: classes.small }}
                         color="secondary"
                         disabled={performingAction}
                         size="small"
                         onClick={this.removeAvatar}
                       >
                         <CloseIcon fontSize="small" />
                       </Fab>
                     </Tooltip>
                   }
                 >
                   {loadingAvatar && (
                     <Badge
                       classes={{ badge: classes.loadingBadge }}
                       badgeContent={
                         <Fade
                           style={{ transitionDelay: "1s" }}
                           in={loadingAvatar}
                           unmountOnExit
                         >
                           <CircularProgress size={120} thickness={1.8} />
                         </Fade>
                       }
                     >
                       <Avatar
                         className={classes.avatar}
                         alt="Avatar"
                         src={avatarUrl}
                       />
                     </Badge>
                   )}

                   {!loadingAvatar && (
                     <Avatar
                       className={classes.avatar}
                       alt="Avatar"
                       src={avatarUrl}
                     />
                   )}
                 </Badge>
               )}

               {!avatar && !avatarUrl && (
                 <>
                   {avatarUrl && (
                     <Badge
                       classes={{ badge: classes.badge }}
                       badgeContent={
                         <Tooltip title="Remove">
                           <Fab
                             classes={{ sizeSmall: classes.small }}
                             color="secondary"
                             disabled={performingAction}
                             size="small"
                             onClick={this.removeAvatar}
                           >
                             <CloseIcon fontSize="small" />
                           </Fab>
                         </Tooltip>
                       }
                     >
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <CircularProgress size={120} thickness={1.8} />
                           }
                         >
                           <Avatar
                             className={classes.avatar}
                             alt="Avatar"
                             src={avatarUrl}
                           />
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar
                           className={classes.avatar}
                           alt="Avatar"
                           src={avatarUrl}
                         />
                       )}
                     </Badge>
                   )}

                   {!avatarUrl && (
                     <>
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <Fade
                               style={{ transitionDelay: "1s" }}
                               in={loadingAvatar}
                               unmountOnExit
                             >
                               <CircularProgress size={120} thickness={1.8} />
                             </Fade>
                           }
                         >
                           <Avatar className={classes.avatar} alt="Avatar">
                             {this.getNameInitialsOrIcon()}
                           </Avatar>
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar className={classes.avatar} alt="Avatar">
                           {this.getNameInitialsOrIcon()}
                         </Avatar>
                       )}
                     </>
                   )}
                 </>
               )}
             </Box>

             {avatar && avatarUrl && (
               <Button
                 color="primary"
                 disabled={performingAction}
                 startIcon={<CloudUploadIcon />}
                 variant="contained"
                 onClick={this.uploadAvatar}
               >
                 Upload
               </Button>
             )}

             {!avatar && !avatarUrl && (
               <>
                 <input
                   id="avatar-input"
                   type="file"
                   hidden
                   accept="image/*"
                   onChange={this.handleAvatarChange}
                 />

                 <label htmlFor="avatar-input">
                   <Button
                     color="primary"
                     component="span"
                     disabled={performingAction}
                     startIcon={<PhotoIcon />}
                     variant="contained"
                   >
                     Choose...
                   </Button>
                 </label>
               </>
             )}
           </Box>

           <Grid container>
             <Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Profile completion</Typography>

                 {profileCompletion === 0 && (
                   <Typography color="error" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion === 100 && (
                   <Typography color="primary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion !== 0 && profileCompletion !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
               </Box>
             </Grid>

             <Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Security rating</Typography>

                 {securityRating === 0 && (
                   <Typography color="error" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating === 100 && (
                   <Typography color="primary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating !== 0 && securityRating !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
               </Box>
             </Grid>
           </Grid>
         </Hidden>
       </Box>

       <List disablePadding>
         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasFirstName && (
             <ListItemIcon>
               <Tooltip title="No first name">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "first-name" && (
             <TextField
               autoComplete="given-name"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.firstName)}
               fullWidth
               helperText={
                 errors && errors.firstName
                   ? errors.firstName[0]
                   : "Press Enter to change your first name"
               }
               label="First name"
               placeholder={hasFirstName && user.student_name.split(" ")[0]}
               required
               type="text"
               value={firstName}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "first-name")}
               onChange={this.handleFirstNameChange}
             />
           )}

           {showingField !== "first-name" && (
             <>
               <ListItemText
                 primary="First name"
                 secondary={
                   hasFirstName
                     ? user.student_name.split(" ")[0]
                     : "You don’t have a first name"
                 }
               />

               <ListItemSecondaryAction>
                 {hasFirstName && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("first-name")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasFirstName && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("first-name")}
                   >
                     Add
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasLastName && (
             <ListItemIcon>
               <Tooltip title="No last name">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "last-name" && (
             <TextField
               autoComplete="family-name"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.lastName)}
               fullWidth
               helperText={
                 errors && errors.lastName
                   ? errors.lastName[0]
                   : "Press Enter to change your last name"
               }
               label="Last name"
               placeholder={hasLastName && user.student_name.split(" ")[1]}
               required
               type="text"
               value={lastName}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "last-name")}
               onChange={this.handleLastNameChange}
             />
           )}

           {showingField !== "last-name" && (
             <>
               <ListItemText
                 primary="Last name"
                 secondary={
                   hasLastName
                     ? user.student_name.split(" ")[1]
                     : "You don’t have a last name"
                 }
               />

               <ListItemSecondaryAction>
                 {hasLastName && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("last-name")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasLastName && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("last-name")}
                   >
                     Add
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonOutlineIcon />
             </ListItemIcon>
           </Hidden>

           {!hasUsername && (
             <ListItemIcon>
               <Tooltip title="No username">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "username" && (
             <TextField
               autoComplete="username"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.username)}
               fullWidth
               helperText={
                 errors && errors.username
                   ? errors.username[0]
                   : "Press Enter to change your username"
               }
               label="Username"
               placeholder={hasUsername && user.student_name}
               required
               type="text"
               value={username}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "username")}
               onChange={this.handleUsernameChange}
             />
           )}

           {showingField !== "username" && (
             <>
               <ListItemText
                 primary="Username"
                 secondary={
                   hasUsername
                     ? user.student_name
                     : "You don’t have a username"
                 }
               />

               <ListItemSecondaryAction>
                 {hasUsername && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("username")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasUsername && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("username")}
                   >
                     Add
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <EmailIcon />
             </ListItemIcon>
           </Hidden>

           {emailAddress && (
             <ListItemIcon>
               <>
                 {emailVerified && (
                   <Tooltip title="Verified">
                     <CheckIcon color="primary" />
                   </Tooltip>
                 )}

                 {!emailVerified && (
                   <Tooltip title="Not verified">
                     <WarningIcon color="error" />
                   </Tooltip>
                 )}
               </>
             </ListItemIcon>
           )}

           {!emailAddress && (
             <ListItemIcon>
               <Tooltip title="No e-mail address">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "email-address" && (
             <TextField
               autoComplete="email"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.emailAddress)}
               fullWidth
               helperText={
                 errors && errors.emailAddress
                   ? errors.emailAddress[0]
                   : "Press Enter to change your e-mail address"
               }
               label="E-mail address"
               placeholder={emailAddress}
               required
               type="email"
               value={emailAddress}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) =>
                 this.handleKeyDown(event, "email-address")
               }
               onChange={this.handleEmailAddressChange}
             />
           )}

           {showingField !== "email-address" && (
             <>
               <ListItemText
                 primary="E-mail address"
                 secondary={
                   emailAddress ? emailAddress : "You don’t have an e-mail address"
                 }
               />

               {emailAddress && !emailVerified && (
                 <Box clone mr={7}>
                   <ListItemSecondaryAction>
                     <Tooltip title="Verify">
                       <div>
                         <IconButton
                           color="secondary"
                           disabled={performingAction || sentVerificationEmail}
                           onClick={this.verifyEmailAddress}
                         >
                           <CheckIcon />
                         </IconButton>
                       </div>
                     </Tooltip>
                   </ListItemSecondaryAction>
                 </Box>
               )}

               <ListItemSecondaryAction>
                 {emailAddress && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("email-address")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!emailAddress && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("email-address")}
                   >
                     Add
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <AccessTimeIcon />
             </ListItemIcon>
           </Hidden>

           <Hidden xsDown>
             <ListItemText
               primary="Signed in"
             />
           </Hidden>

           <Hidden smUp>
             <ListItemText
               primary="Signed in"
             />
           </Hidden>
         </ListItem>

         <Box mt={1} mb={1}>
           <Divider light />
         </Box>

         {/**<ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <DeleteForeverIcon />
             </ListItemIcon>
           </Hidden>

           <ListItemText
             primary="Delete account"
             secondary="Accounts can’t be recovered"
           />

           <ListItemSecondaryAction>
             <Button
               color="secondary"
               disabled={performingAction}
               variant="contained"
             >
               Delete
             </Button>
           </ListItemSecondaryAction>
         </ListItem>*/}
       </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(Account)
