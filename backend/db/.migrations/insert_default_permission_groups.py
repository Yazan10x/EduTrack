import json
import confiq
import mongoengine as me
from models import Permissions, PermissionsGroup
from bson import ObjectId


def import_permissions_groups():
    # Load permissions groups from the JSON file
    with open('db/.migrations/.data/default_permissions1.json', 'r') as file:
        data = json.load(file)

    permissions_groups = data.get('permissions_groups', [])

    # Validate and upsert (update or create) permissions groups
    for group_data in permissions_groups:
        try:
            # Convert permission strings from JSON to Permissions enum values
            permissions = []
            for perm_str in group_data['permissions']:
                try:
                    # Ensure that only valid enum values are used
                    permission_enum = Permissions[perm_str]  # Access the enum by string
                    permissions.append(permission_enum.value)  # Store the enum's value
                except KeyError:
                    print(f"Invalid permission '{perm_str}' in group '{group_data['name']}'")

            if not permissions:
                print(f"No valid permissions found for group: {group_data['name']}, skipping.")
                continue

            # Attempt to find an existing permissions group by ID
            permissions_group = PermissionsGroup.objects(id=ObjectId(group_data['id'])).first()

            if permissions_group:
                # If it exists, update the permissions and name
                permissions_group.permissions = permissions
                permissions_group.name = group_data['name']
                permissions_group.level = group_data['level']
                print(f"Updating existing group: {group_data['name']}")
            else:
                # If it doesn't exist, create a new one
                permissions_group = PermissionsGroup(
                    id=ObjectId(group_data['id']),
                    name=group_data['name'],
                    permissions=permissions,
                    level=group_data['level'],
                )
                print(f"Creating new group: {group_data['name']}")

            # Save either the updated or new permissions group
            permissions_group.save()

        except (me.ValidationError, KeyError) as e:
            print(f"Skipping invalid permissions group: {group_data}, Error: {e}")


def run():
    import_permissions_groups()


if __name__ == '__main__':
    if input("Are you sure you want to proceed? (n/YeS): ").strip() == "YeS":
        run()
        print("Completed")
    else:
        print("Terminated")
