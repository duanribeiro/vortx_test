from flask_restplus import Resource, Namespace
from flask import Response

api = Namespace('', 'Main API')

mapping_cost = {
    '011': {
        '016': 1.9,
        '017': 1.7,
        '018': 0.9
    },
    '016': {
        '011': 2.9,
    },
    '017': {
        '011': 2.7,
    },
    '018': {
        '011': 1.9,
    }
}

plan_discount_time = {
    'FaleMais 30': 30,
    'FaleMais 60': 60,
    'FaleMais 120': 120
}

def calculate_time_call(time, origin, destination):
    try:
        print(str(destination))

        return round(time * mapping_cost[str(origin)][str(destination)], 2)
    except:
        return api.abort(400, 'invalid_origin_destination')

def calculate_plan_time_call(time, origin, destination, plan_name):
    discount_time = plan_discount_time[plan_name]
    time = time - discount_time if discount_time < time else 0

    if time > 0:
        return round(time * (mapping_cost[origin][destination] * 1.1), 2)

    return time

@api.route('/calculate')
class calculate(Resource):

    @api.doc(responses={
        200: 'Success',
        400: 'Bad Request'
    }, security=None)
    def post(self):
        """
        Calculate both costs
        """
        if not api.payload:
            api.abort(400)

        plan_name = api.payload.get('data').get('planName')[0]
        time = api.payload.get('data').get('state').get('time')
        origin = api.payload.get('data').get('state').get('origin')
        destination = api.payload.get('data').get('state').get('destination')

        cost_no_plan = calculate_time_call(time=time, origin=origin, destination=destination)
        cost_with_plan = calculate_plan_time_call(time=time, origin=origin, destination=destination, plan_name=plan_name)

        response = Response("{0}-{1}".format(cost_no_plan, cost_with_plan), headers={'Access-Control-Allow-Origin':'*'})

        return response
