import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

//FILTER OPTION IS COMING FROM THE LIBRARY
const StudentListTable = ({ studentsList, refreshData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const CustomButoon = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props?.data?.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState();

  useEffect(() => {
    console.log("From the studentListTable page", studentsList);
    studentsList && setRowData(studentsList);
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: CustomButoon },
  ]);

  const deleteRecord = (id) => {
    // console.log(id)
    GlobalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast("Record Deleted");
        refreshData();
      }
    });
  };
  return (
    <div>
      {/* // wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <div className="p-2 my-7 rounded-lg border shadow-sm flex gap-2 mb-4">
          <Search />
          <input
            type="text"
            name="search"
            className="outline-none w-full"
            placeholder="Search on Anything.."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          quickFilterText={searchTerm}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
