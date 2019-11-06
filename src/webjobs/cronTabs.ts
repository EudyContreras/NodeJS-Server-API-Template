const tabs = {
   cleanup_invitations: {
      JOB: 'remove expired invitation',
      TAB: '30 2 * * *'
   },
   cleanup_passwords: {
      JOB: 'remove old teporary passwords',
      TAB: '30 3 * * *'
   },
}

export default tabs;