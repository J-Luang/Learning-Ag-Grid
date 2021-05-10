using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace API.Enum
{
    public enum Status
    {
        [Description("Backlog")]
        backlog,
        [Description("In Progress")]
        inprogress,
        [Description("In Review")]
        inreview,
        [Description("Completed")]
        completed
    }
}
