import { UserJobs } from "../types";
const JobTable = ({ jobs }: { jobs: UserJobs }) => {
  return (
    <table>
      <tr>
        <th>Company</th>
        <th>Position</th>
        <th>Contract</th>
        <th>Location</th>
        <th>Date Applied</th>
        <th>Status</th>
        <th>View Job</th>
      </tr>
      <tbody>
        {jobs.map((el) => {
          const { id, company, position, contract, location } = el.job;
          return (
            <tr key={el.job.id}>
              <td>{company}</td>
              <td>{position}</td>
              <td>{contract}</td>
              <td>{location}</td>
              <td>{el.appliedAt}</td>
              <td>status</td>
              <td>
                <button>view job</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default JobTable;
