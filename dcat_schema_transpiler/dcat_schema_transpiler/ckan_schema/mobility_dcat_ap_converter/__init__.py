"""
class_converter needs access to all class converters. Let's import all of them here.
"""
import pkgutil
import importlib
import os

converters_folder_name = 'classes'

converter_classes_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), converters_folder_name))

for module_finder, name, ispkg in pkgutil.walk_packages([converter_classes_dir]):
    importlib.import_module(f'{__name__}.{converters_folder_name}.{name}')