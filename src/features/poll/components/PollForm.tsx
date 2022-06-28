import {Question} from "../types";
import {useState} from "react";
import {Alert, Box, Button, Container, Paper, TextField, Typography} from "@mui/material";

export interface IPollFormProps {
    onAdd: (optionOne:string, optionTwo: string) => void,
    error?: string,
    loading?: boolean
}

const PollForm = ({onAdd,error,loading}:IPollFormProps) => {
    const [optionOne,setOptionOne] = useState<{value: string,error:null|string}>({value:'', error: null});
    const [optionTwo,setOptionTwo] = useState<{value: string,error:null|string}>({value:'', error: null});

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(optionOne.value.trim()==='')
            setOptionOne(state=>({...state,error: 'Option One can not be empty'}));
        else
            setOptionOne(state=>({...state,error: null}));

        if(optionTwo.value.trim()==='')
            setOptionTwo(state=>({...state,error: 'Option Two can not be empty'}));
        else
            setOptionTwo(state=>({...state,error: null}));

        if(optionOne.error===null && optionTwo.error===null)
            onAdd(optionOne.value,optionTwo.value);
    }

  return <Paper>
      <Typography>Add New Question</Typography>
      <Container>
          {error && (
              <Alert severity="error">{error}</Alert>
          )}
          {optionOne.error && (
              <Alert severity="error">{optionOne.error}</Alert>
          )}
          {optionTwo.error && (
              <Alert severity="error">{optionTwo.error}</Alert>
          )}
          <Box component="form"
               sx={{
                   '& .MuiTextField-root': { m: 1, width: '25ch' },
               }}
               m={1}
               display="flex"
               justifyContent="space-between"
               alignItems="center"
               flexDirection="column"
               onSubmit={onSubmit}
          >
              <h1>Would you rather?</h1>
              <div>
                  <TextField
                      required
                      id="optionOne"
                      label="Option One"
                      value={optionOne.value}
                      onChange={(event)=> setOptionOne(state=> ({...state, value: event.target.value}))}
                      error={optionOne.error!=null}
                      helperText={optionOne.error!=null ? optionOne.error : ""}
                  />
              </div>
              <div>
                  <TextField
                      required
                      id="optionTwo"
                      label="Option Two"
                      value={optionTwo.value}
                      onChange={(event)=> setOptionTwo(state=> ({...state, value: event.target.value}))}
                      error={optionTwo.error!=null}
                      helperText={optionTwo.error!=null ? optionTwo.error : ""}
                  />
              </div>
              <Button
                  type="submit"
                  aria-label="Login"
                  sx={{
                      alignSelf: 'flex-end'
                  }}
                  disabled={loading}
              >Ask</Button>
          </Box>
      </Container>
  </Paper>
}

export default PollForm;