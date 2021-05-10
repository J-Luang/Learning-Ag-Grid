using API.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class StatusService
    {
        List<string> statuses = new List<string>();
        List<int> statusNum = new List<int>();

        public static string GetDescription(Status value) {
            var field = value.GetType().GetField(value.ToString());
            var attr = field.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attr.Length == 0 ? value.ToString() : (attr[0] as DescriptionAttribute).Description;
        }

        public static int GetNumValue(Status value) {
            var field = value.GetHashCode();
            return field;
        }

        public List<string> GetStatusValues() {
            statuses.Add(GetDescription(Status.backlog));
            statuses.Add(GetDescription(Status.inprogress));
            statuses.Add(GetDescription(Status.inreview));
            statuses.Add(GetDescription(Status.completed));

            return statuses;
        }

        public List<int> GetStatusNum()
        {
            statusNum.Add(Status.backlog.GetHashCode());
            statusNum.Add(Status.inprogress.GetHashCode());
            statusNum.Add(Status.inreview.GetHashCode());
            statusNum.Add(Status.completed.GetHashCode());

            return statusNum;
        }
    }
}
