import pytest
from run import app
import json


@pytest.fixture
def client():
    client = app.test_client()

    yield client

def test_wrong_method(client):
    """Testing wrong method"""

    response = client.get('/api/v1/calculate')
    assert response.status_code == 405


def test_calculator(client):
    """Testing calculator"""
    data = {
        'data':  {
            'state':
                {'time': 60, 'origin': '011', 'destination': '016'},
            'planName':
                ['FaleMais 60']
         }
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    response = client.post('/api/v1/calculate', data=json.dumps(data), headers=headers)
    cost = response.data.decode("utf-8")

    assert cost == '114.0-0'

