import pprint

def print_field_and_data(field_name: str, data: dict):
    print('FIELD NAME AND DATA ------>')
    print(f'field_name: {field_name}')
    pprint.pprint(data)
    print('<----- FIELD NAME AND DATA')


helpers = {
    'print_field_and_data': print_field_and_data,
}
