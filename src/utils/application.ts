interface ApplicationStatus {
  stage_id: number;
  stage_name: string;
  status_id: number;
  status_name: string;
}

export const applicationStatus: ApplicationStatus[] = [
  {
    stage_id: 1,
    stage_name: 'Application Received or Payment status',
    status_id: 1,
    status_name: 'Application Received / Not Paid'
  },
  {
    stage_id: 1,
    stage_name: 'Application Received or Payment status',
    status_id: 2,
    status_name: 'Paid'
  },
  {
    stage_id: 2,
    stage_name: 'Non Outstanding',
    status_id: 3,
    status_name: 'Missing'
  },
  {
    stage_id: 2,
    stage_name: 'Non Outstanding',
    status_id: 4,
    status_name: 'Missing (Non Paid)'
  },
  {
    stage_id: 2,
    stage_name: 'Non Outstanding',
    status_id: 5,
    status_name: 'Non Outstanding (Non Paid)'
  },
  {
    stage_id: 2,
    stage_name: 'Non Outstanding',
    status_id: 6,
    status_name: 'Non Outstanding'
  },
  {
    stage_id: 3,
    stage_name: 'Submitted',
    status_id: 7,
    status_name: 'Submitted'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 8,
    status_name: 'Request Additional Documents/ Information'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 9,
    status_name: 'Under Review /or/ Processing'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 10,
    status_name: 'Waitlisted'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 11,
    status_name: 'Deferred'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 12,
    status_name: 'Program Closed'
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    status_id: 13,
    status_name: 'Rejected'
  },
  {
    stage_id: 5,
    stage_name: 'Accepted',
    status_id: 14,
    status_name: 'Conditionally Accepted'
  },
  {
    stage_id: 5,
    stage_name: 'Accepted',
    status_id: 15,
    status_name: 'Unconditionally Accepted'
  },
  {
    stage_id: 5,
    stage_name: 'Accepted',
    status_id: 16,
    status_name: 'Withdrawn / Cancelled'
  },
  {
    stage_id: 5,
    stage_name: 'Accepted',
    status_id: 17,
    status_name: 'Closed - Application Proceed in another Institute'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 18,
    status_name: 'Full Tuition Fee Paid / Tuition Receipt Received'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 19,
    status_name: 'Full Tuition Fee Paid / Tuition Receipt Pending'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 20,
    status_name: 'Tuition Deposit Paid / Tuition Receipt Pending'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 21,
    status_name: 'Tuition Deposit Paid / Tuition Receipt Received'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 22,
    status_name: 'Unconditionally Accepted & Tuition Deposit Paid'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 23,
    status_name: 'LOA not required'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 24,
    status_name: 'LOA received'
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    status_id: 25,
    status_name: 'LOA Pending'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 26,
    status_name: 'Refund Requested'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 27,
    status_name: 'Visa in Process / Visa Applied'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 28,
    status_name: 'Visa Rejected'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 29,
    status_name: 'AIP Received'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 30,
    status_name: 'Visa not required (Onshore)'
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    status_id: 31,
    status_name: 'Visa Approved'
  },
  {
    stage_id: 8,
    stage_name: 'Enrollment Confirmed',
    status_id: 32,
    status_name: 'Pending Enrollment'
  },
  {
    stage_id: 8,
    stage_name: 'Enrollment Confirmed',
    status_id: 33,
    status_name: 'Not Enrolled'
  },
  {
    stage_id: 8,
    stage_name: 'Enrollment Confirmed',
    status_id: 34,
    status_name: 'Discontinued Enrollment'
  },
  {
    stage_id: 8,
    stage_name: 'Enrollment Confirmed',
    status_id: 35,
    status_name: 'Enrollment Confirmed'
  },
  {
    stage_id: 9,
    stage_name: 'Full Commission Received',
    status_id: 36,
    status_name: 'Partial Commission Completed'
  },
  {
    stage_id: 9,
    stage_name: 'Full Commission Received',
    status_id: 37,
    status_name: 'Full Commission Completed'
  }
];

export const applicationStatus2 = [
  {
    stage_id: 1,
    stage_name: 'Application Received or Payment status',
    statuses: [
      {
        status_id: 1,
        status_name: 'Application Received / Not Paid'
      },
      {
        status_id: 2,
        status_name: 'Paid'
      }
    ]
  },
  {
    stage_id: 2,
    stage_name: 'Non Outstanding',
    statuses: [
      {
        status_id: 3,
        status_name: 'Missing'
      },
      {
        status_id: 4,
        status_name: 'Missing (Non Paid)'
      },
      {
        status_id: 5,
        status_name: 'Non Outstanding (Non Paid)'
      },
      {
        status_id: 6,
        status_name: 'Non Outstanding'
      }
    ]
  },
  {
    stage_id: 3,
    stage_name: 'Submitted',
    statuses: [
      {
        status_id: 7,
        status_name: 'Submitted'
      }
    ]
  },
  {
    stage_id: 4,
    stage_name: 'Post Submission',
    statuses: [
      {
        status_id: 8,
        status_name: 'Request Additional Documents/ Information'
      },
      {
        status_id: 9,
        status_name: 'Under Review /or/ Processing'
      },
      {
        status_id: 10,
        status_name: 'Waitlisted'
      },
      {
        status_id: 11,
        status_name: 'Deferred'
      },
      {
        status_id: 12,
        status_name: 'Program Closed'
      },
      {
        status_id: 13,
        status_name: 'Rejected'
      }
    ]
  },
  {
    stage_id: 5,
    stage_name: 'Accepted',
    statuses: [
      {
        status_id: 14,
        status_name: 'Conditionally Accepted'
      },
      {
        status_id: 15,
        status_name: 'Unconditionally Accepted'
      },
      {
        status_id: 16,
        status_name: 'Withdrawn / Cancelled'
      },
      {
        status_id: 17,
        status_name: 'Closed - Application Proceed in another Institute'
      }
    ]
  },
  {
    stage_id: 6,
    stage_name: 'Tuition Deposit Completed & lOA Status',
    statuses: [
      {
        status_id: 18,
        status_name: 'Full Tuition Fee Paid / Tuition Receipt Received'
      },
      {
        status_id: 19,
        status_name: 'Full Tuition Fee Paid / Tuition Receipt Pending'
      },
      {
        status_id: 20,
        status_name: 'Tuition Deposit Paid / Tuition Receipt Pending'
      },
      {
        status_id: 21,
        status_name: 'Tuition Deposit Paid / Tuition Receipt Received'
      },
      {
        status_id: 22,
        status_name: 'Unconditionally Accepted & Tuition Deposit Paid'
      },
      {
        status_id: 23,
        status_name: 'LOA not required'
      },
      {
        status_id: 24,
        status_name: 'LOA received'
      },
      {
        status_id: 25,
        status_name: 'LOA Pending'
      }
    ]
  },
  {
    stage_id: 7,
    stage_name: 'Visa Approved',
    statuses: [
      {
        status_id: 26,
        status_name: 'Refund Requested'
      },
      {
        status_id: 27,
        status_name: 'Visa in Process / Visa Applied'
      },
      {
        status_id: 28,
        status_name: 'Visa Rejected'
      },
      {
        status_id: 29,
        status_name: 'AIP Received'
      },
      {
        status_id: 30,
        status_name: 'Visa not required (Onshore)'
      },
      {
        status_id: 31,
        status_name: 'Visa Approved'
      }
    ]
  },
  {
    stage_id: 8,
    stage_name: 'Enrollment Confirmed',
    statuses: [
      {
        status_id: 32,
        status_name: 'Pending Enrollment'
      },
      {
        status_id: 33,
        status_name: 'Not Enrolled'
      },
      {
        status_id: 34,
        status_name: 'Discontinued Enrollment'
      },
      {
        status_id: 35,
        status_name: 'Enrollment Confirmed'
      }
    ]
  },
  {
    stage_id: 9,
    stage_name: 'Full Commission Received',
    statuses: [
      {
        status_id: 36,
        status_name: 'Partial Commission Completed'
      },
      {
        status_id: 37,
        status_name: 'Full Commission Completed'
      }
    ]
  }
];

export const applicationStatus3 = [
  {
    stage_id: 1,
    stage_name: 'Pre-Payment Stage',
    statuses: [
      {
        status_id: 1,
        status_name: 'Not Paid (Application Received)',
        color: 'red', // Red text color
        bgColor: '#FF6347' // Light red background for not paid
      }
    ]
  },
  {
    stage_id: 2,
    stage_name: 'Pre-Submission Stage',
    statuses: [
      {
        status_id: 2,
        status_name: 'Paid / Waived',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for paid/waived
      }
    ]
  },
  {
    stage_id: 3,
    stage_name: 'Post Submission Stage',
    statuses: [
      {
        status_id: 3,
        status_name: 'Submitted',
        color: 'black', // Black text color
        bgColor: '#FFD700' // Yellow background for submitted
      },
      {
        status_id: 4,
        status_name: 'Accepted',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for accepted
      },
      {
        status_id: 5,
        status_name: 'Waitlisted',
        color: 'orange', // Orange text color
        bgColor: '#FF8C00' // Orange background for waitlisted
      },
      {
        status_id: 6,
        status_name: 'Rejected',
        color: 'red', // Red text color
        bgColor: '#FF0000' // Red background for rejected
      },
      {
        status_id: 7,
        status_name: 'Program Closed',
        color: 'gray', // Gray text color
        bgColor: '#808080' // Grey background for closed
      },
      {
        status_id: 8,
        status_name: 'Conditionally Accepted',
        color: 'yellow', // Yellow text color
        bgColor: '#FFFF00' // Yellow background for conditionally accepted
      },
      {
        status_id: 9,
        status_name: 'Deferred',
        color: 'blue', // Blue text color
        bgColor: '#00BFFF' // Light blue background for deferred
      },
      {
        status_id: 10,
        status_name: 'Tuition Fee Paid',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for fee paid
      },
      {
        status_id: 11,
        status_name: 'Tuition Fee Partial Paid',
        color: 'yellow', // Yellow text color
        bgColor: '#FFD700' // Yellow background for partial payment
      }
    ]
  },
  {
    stage_id: 4,
    stage_name: 'Visa Stage',
    statuses: [
      {
        status_id: 12,
        status_name: 'Approved / Not Required',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for approved
      },
      {
        status_id: 13,
        status_name: 'Rejected',
        color: 'red', // Red text color
        bgColor: '#FF0000' // Red background for rejected
      },
      {
        status_id: 14,
        status_name: 'Applied',
        color: 'black', // Black text color
        bgColor: '#FFD700' // Yellow background for applied
      }
    ]
  },
  {
    stage_id: 5,
    stage_name: 'Enrolment / Commission Stage',
    statuses: [
      {
        status_id: 15,
        status_name: 'Refund Requested',
        color: 'red', // Red text color
        bgColor: '#FF6347' // Light red background for refund requested
      },
      {
        status_id: 16,
        status_name: 'Enrolment Confirmed',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for confirmed
      },
      {
        status_id: 17,
        status_name: 'Discontinued Enrolment',
        color: 'red', // Red text color
        bgColor: '#FF0000' // Red background for discontinued
      },
      {
        status_id: 18,
        status_name: 'Full Received',
        color: 'green', // Green text color
        bgColor: '#32CD32' // Green background for full received
      },
      {
        status_id: 19,
        status_name: 'Partial Received',
        color: 'yellow', // Yellow text color
        bgColor: '#FFD700' // Yellow background for partial received
      }
    ]
  }
];



export const applicationLevels = [
  {
    label: 'Pre-Payment Stage',
    isTitle: true
  },
  {
    value: 1,
    label: 'Not Paid (Application Received)'
  },
  {
    label: 'Pre-Submission Stage',
    isTitle: true
  },
  {
    value: 2,
    label: 'Paid / Waived'
  },
  {
    label: 'Post Submission Stage',
    isTitle: true
  },
  {
    value: 3,
    label: 'Submitted'
  },
  {
    value: 4,
    label: 'Accepted'
  },
  {
    value: 5,
    label: 'Waitlisted'
  },
  {
    value: 6,
    label: 'Rejected'
  },
  {
    value: 7,
    label: 'Program Closed'
  },
  {
    value: 8,
    label: 'Conditionally Accepted'
  },
  {
    value: 9,
    label: 'Deferred'
  },
  {
    value: 10,
    label: 'Tuition Fee Paid'
  },
  {
    value: 11,
    label: 'Tuition Fee Partial Paid'
  },
  {
    label: 'Visa Stage',
    isTitle: true
  },
  {
    value: 12,
    label: 'Approved / Not Required'
  },
  {
    value: 13,
    label: 'Rejected'
  },
  {
    value: 14,
    label: 'Applied'
  },
  {
    label: 'Enrolment / Commission Stage',
    isTitle: true
  },
  {
    value: 15,
    label: 'Refund Requested'
  },
  {
    value: 16,
    label: 'Enrolment Confirmed'
  },
  {
    value: 17,
    label: 'Discontinued Enrolment'
  },
  {
    value: 18,
    label: 'Full Received'
  },
  {
    value: 19,
    label: 'Partial Received'
  }
];


// export const newApplicationStatus = [
//   {
//     tab_id: 1,
//     tab_Name: 'Pre-Payment',
//     route: '/applications/new',
//     statuses: [
//       {
//         status_id: 1,
//         status_name: 'Application Received / Not Paid'
//       },
      
//     ]
//   },
// {
//     tab_id: 2,
//     tab_Name: 'Pre-Submission',
//     route: '/applications/new',
//     statuses: [
//       {
//         status_id: 2,
//         status_name: 'Paid / Waived'
//       },
      
//     ]
//   },


//   {
//     tab_id: 2,
//     route: '/applications/missingRequirement',
//     tab_Name: 'Missing Requirements',
//     statuses: [
//       {
//         status_id: 3,
//         status_name: 'Missing'
//       },
//       {
//         status_id: 4,
//         status_name: 'Missing (Non Paid)'
//       },
//       {
//         status_id: 5,
//         status_name: 'Non Outstanding (Non Paid)'
//       },
//       {
//         status_id: 6,
//         status_name: 'Non Outstanding'
//       }
//     ]
//   },
//   {
//     tab_id: 3,
//     tab_Name: 'Submitted',
//     route: '/applications/submitted',
//     statuses: [
//       {
//         status_id: 7,
//         status_name: 'Submitted'
//       },
//       {
//         status_id: 8,
//         status_name: 'Request Additional Documents/ Information'
//       },
//       {
//         status_id: 9,
//         status_name: 'Under Review /or/ Processing'
//       },
//       {
//         status_id: 10,
//         status_name: 'Waitlisted'
//       },
//       {
//         status_id: 11,
//         status_name: 'Deferred'
//       }
//     ]
//   },

//   {
//     tab_id: 4,
//     tab_Name: 'Accepted',
//     route: '/applications/accepted',
//     statuses: [
//       {
//         status_id: 14,
//         status_name: 'Conditionally Accepted'
//       },
//       {
//         status_id: 15,
//         status_name: 'Unconditionally Accepted'
//       }
//     ]
//   },
//   {
//     tab_id: 5,
//     tab_Name: 'Tuition Paid',
//     route: '/applications/tuitionPaid',
//     statuses: [
//       {
//         status_id: 18,
//         status_name: 'Full Tuition Fee Paid / Tuition Receipt Received'
//       },
//       {
//         status_id: 19,
//         status_name: 'Full Tuition Fee Paid / Tuition Receipt Pending'
//       },
//       {
//         status_id: 20,
//         status_name: 'Tuition Deposit Paid / Tuition Receipt Pending'
//       },
//       {
//         status_id: 21,
//         status_name: 'Tuition Deposit Paid / Tuition Receipt Received'
//       },
//       {
//         status_id: 22,
//         status_name: 'Unconditionally Accepted & Tuition Deposit Paid'
//       },
//       {
//         status_id: 23,
//         status_name: 'LOA not required'
//       },
//       {
//         status_id: 24,
//         status_name: 'LOA received'
//       },
//       {
//         status_id: 25,
//         status_name: 'LOA Pending'
//       }
//     ]
//   },
//   {
//     tab_id: 6,
//     tab_Name: 'Visa',
//     route: '/applications/visa',
//     statuses: [
//       {
//         status_id: 26,
//         status_name: 'Refund Requested'
//       },
//       {
//         status_id: 27,
//         status_name: 'Visa in Process / Visa Applied'
//       },
//       {
//         status_id: 28,
//         status_name: 'Visa Rejected'
//       },
//       {
//         status_id: 29,
//         status_name: 'AIP Received'
//       },
//       {
//         status_id: 30,
//         status_name: 'Visa not required (Onshore)'
//       },
//       {
//         status_id: 31,
//         status_name: 'Visa Approved'
//       },
//       {
//         status_id: 32,
//         status_name: 'Pending Enrollment'
//       },
//       {
//         status_id: 33,
//         status_name: 'Not Enrolled'
//       },
//       {
//         status_id: 34,
//         status_name: 'Discontinued Enrollment'
//       },
//       {
//         status_id: 35,
//         status_name: 'Enrollment Confirmed'
//       }
//     ]
//   }
// ];



export const newApplicationStatus = [
  {
    tab_id: 1,
    tab_Name: 'Pre-Payment',
    route: '/applications/Pre-Payment',
    statuses: [
      {
        status_id: 1,
        status_name: 'Not Paid (Application Received)',
      }
    ]
  },
  {
    tab_id: 2,
    tab_Name: 'Pre-Submission',
    route: '/applications/Pre-Submission',
    statuses: [
      {
        status_id: 2,
        status_name: 'Paid / Waived',
      }
    ]
  },
  {
    tab_id: 3,
    tab_Name: 'Post Submission',
    route: '/applications/submitted',
    statuses: [
      {
        status_id: 3,
        status_name: 'Submitted',
      },
      {
        status_id: 4,
        status_name: 'Accepted',
      },
      {
        status_id: 5,
        status_name: 'Waitlisted',
      },
      {
        status_id: 6,
        status_name: 'Rejected',
      },
      {
        status_id: 7,
        status_name: 'Program Closed',
      },
      {
        status_id: 8,
        status_name: 'Conditionally Accepted',
      },
      {
        status_id: 9,
        status_name: 'Deferred',
      },
      {
        status_id: 10,
        status_name: 'Tuition Fee Paid',
      },
      {
        status_id: 11,
        status_name: 'Tuition Fee Partial Paid',
      }
    ]
  },
  {
    tab_id: 4,
    tab_Name: 'Visa',
    route: '/applications/visa',
    statuses: [
      {
        status_id: 12,
        status_name: 'Approved / Not Required',
      },
      {
        status_id: 13,
        status_name: 'Rejected',
      },
      {
        status_id: 14,
        status_name: 'Applied',

      }
    ]
  },
  {
    tab_id: 5,
    tab_Name: 'Enrollment / Commission',
    route: '/applications/enrollment',
    statuses: [
      {
        status_id: 15,
        status_name: 'Refund Requested',
      },
      {
        status_id: 16,
        status_name: 'Enrollment Confirmed',

      },
      {
        status_id: 17,
        status_name: 'Discontinued Enrollment',

      },
      {
        status_id: 18,
        status_name: 'Full Received',

      },
      {
        status_id: 19,
        status_name: 'Partial Received',

      }
    ]
  }
];
