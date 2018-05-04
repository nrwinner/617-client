import * as React from 'react'

// TODO add cancel button to invitations list item
// TODO add + button to card-header to open an invitation form (email address input/ submit button)

const InvitationsContainer = ({ invitations }: {invitations: any}) => {
  return (
    <div className="invitations card">
      <div className="card-header">
        <h1>Pending Invitations</h1>
      </div>
      <div className="card-content">
        <div className="invite-li header">
          <strong>Name</strong>
          <strong>Date Invited</strong>
        </div>
        {invitations.map((invite: any) => {
          return (
            <div className="invite-li">
              {invite.name}
              <span>{String(new Date(invite.dateSent).toLocaleDateString())}</span>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default InvitationsContainer