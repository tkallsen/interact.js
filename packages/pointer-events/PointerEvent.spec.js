import test from '@interactjs/_dev/test/test';
import Interaction from '@interactjs/core/Interaction';
import * as helpers from '@interactjs/core/tests/_helpers';
import pointerUtils from '@interactjs/utils/pointerUtils';
import Signals from '@interactjs/utils/Signals';
import PointerEvent from './PointerEvent';
test('PointerEvent constructor', (t) => {
    const type = 'TEST_EVENT';
    const pointerId = -100;
    const testPointerProp = ['TEST_POINTER_PROP'];
    const pointer = {
        pointerId,
        testPointerProp,
        pointerType: 'TEST_POINTER_TYPE',
    };
    const testEventProp = ['TEST_EVENT_PROP'];
    const event = {
        testEventProp,
    };
    const interaction = new Interaction({ signals: new Signals() });
    const eventTarget = {};
    const pointerEvent = new PointerEvent(type, pointer, event, eventTarget, interaction, 0);
    t.equal(pointerEvent.testPointerProp, testPointerProp, 'pointerEvent is extended form pointer');
    t.equal(pointerEvent.testEventProp, testEventProp, 'pointerEvent is extended form Event');
    t.equal(pointerEvent.type, type, 'type is set correctly');
    t.equal(pointerEvent.pointerType, pointerUtils.getPointerType(pointer), 'pointerType is set correctly');
    t.equal(pointerEvent.pointerId, pointerId, 'pointerId is set correctly');
    t.equal(pointerEvent.originalEvent, event, 'originalEvent is set correctly');
    t.equal(pointerEvent.interaction, interaction._proxy, 'interaction is set correctly');
    t.equal(pointerEvent.target, eventTarget, 'target is set correctly');
    t.equal(pointerEvent.currentTarget, null, 'currentTarget is null');
    t.end();
});
test('PointerEvent methods', (t) => {
    const methodContexts = {};
    const event = ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']
        .reduce((acc, methodName) => {
        acc[methodName] = function () { methodContexts[methodName] = this; };
        return acc;
    }, helpers.newPointer());
    const pointerEvent = new PointerEvent('TEST', {}, event, null, {}, 0);
    pointerEvent.preventDefault();
    t.equal(methodContexts.preventDefault, event, 'PointerEvent.preventDefault() calls preventDefault of originalEvent');
    t.notOk(pointerEvent.propagationStopped, 'propagationStopped is false before call to stopPropagation');
    pointerEvent.stopPropagation();
    t.ok(pointerEvent.propagationStopped, 'stopPropagation sets propagationStopped to true');
    t.equal(methodContexts.stopPropagation, undefined, 'PointerEvent.stopPropagation() does not call stopPropagation of originalEvent');
    t.notOk(pointerEvent.immediatePropagationStopped, 'immediatePropagationStopped is false before call to stopImmediatePropagation');
    pointerEvent.stopImmediatePropagation();
    t.equal(methodContexts.stopImmediatePropagation, undefined, 'PointerEvent.stopImmediatePropagation() does not call stopImmediatePropagation of originalEvent');
    t.ok(pointerEvent.immediatePropagationStopped, 'stopImmediatePropagation sets immediatePropagationStopped to true');
    const origin = { x: 20, y: 30 };
    pointerEvent._subtractOrigin(origin);
    t.equal(pointerEvent.pageX, event.pageX - origin.x, 'subtractOrigin updates pageX correctly');
    t.equal(pointerEvent.pageY, event.pageY - origin.y, 'subtractOrigin updates pageY correctly');
    t.equal(pointerEvent.clientX, event.clientX - origin.x, 'subtractOrigin updates clientX correctly');
    t.equal(pointerEvent.clientY, event.clientY - origin.y, 'subtractOrigin updates clientY correctly');
    pointerEvent._addOrigin(origin);
    t.ok(['pageX', 'pageY', 'clientX', 'clientY'].reduce((allEqual, prop) => allEqual && pointerEvent[prop] === event[prop], true), 'addOrigin with the subtracted origin reverts to original coordinates');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9pbnRlckV2ZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQb2ludGVyRXZlbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSw0QkFBNEIsQ0FBQTtBQUM3QyxPQUFPLFdBQVcsTUFBTSw4QkFBOEIsQ0FBQTtBQUN0RCxPQUFPLEtBQUssT0FBTyxNQUFNLGlDQUFpQyxDQUFBO0FBQzFELE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFBO0FBQ3pELE9BQU8sT0FBTyxNQUFNLDJCQUEyQixDQUFBO0FBQy9DLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFBO0FBRXpDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQTtJQUN6QixNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUN0QixNQUFNLGVBQWUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDN0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxTQUFTO1FBQ1QsZUFBZTtRQUNmLFdBQVcsRUFBRSxtQkFBbUI7S0FDMUIsQ0FBQTtJQUNSLE1BQU0sYUFBYSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN6QyxNQUFNLEtBQUssR0FBRztRQUNaLGFBQWE7S0FDUCxDQUFBO0lBQ1IsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBUyxDQUFDLENBQUE7SUFDdEUsTUFBTSxXQUFXLEdBQUcsRUFBYSxDQUFBO0lBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFRLENBQUE7SUFFL0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFD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WSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVwQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUksS0FBSyxDQUFDLEtBQUssR0FBSyxNQUFNLENBQUMsQ0FBQyxFQUFFLHdDQUF3QyxDQUFDLENBQUE7SUFDakcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUssTUFBTSxDQUFDLENBQUMsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO0lBQ2pHLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsMENBQTBDLENBQUMsQ0FBQTtJQUNuRyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLDBDQUEwQyxDQUFDLENBQUE7SUFFbkcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQzVILHNFQUFzRSxDQUFDLENBQUE7SUFFekUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ1QsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdAaW50ZXJhY3Rqcy9fZGV2L3Rlc3QvdGVzdCdcbmltcG9ydCBJbnRlcmFjdGlvbiBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL0ludGVyYWN0aW9uJ1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL3Rlc3RzL19oZWxwZXJzJ1xuaW1wb3J0IHBvaW50ZXJVdGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9wb2ludGVyVXRpbHMnXG5pbXBvcnQgU2lnbmFscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9TaWduYWxzJ1xuaW1wb3J0IFBvaW50ZXJFdmVudCBmcm9tICcuL1BvaW50ZXJFdmVudCdcblxudGVzdCgnUG9pbnRlckV2ZW50IGNvbnN0cnVjdG9yJywgKHQpID0+IHtcbiAgY29uc3QgdHlwZSA9ICdURVNUX0VWRU5UJ1xuICBjb25zdCBwb2ludGVySWQgPSAtMTAwXG4gIGNvbnN0IHRlc3RQb2ludGVyUHJvcCA9IFsnVEVTVF9QT0lOVEVSX1BST1AnXVxuICBjb25zdCBwb2ludGVyID0ge1xuICAgIHBvaW50ZXJJZCxcbiAgICB0ZXN0UG9pbnRlclByb3AsXG4gICAgcG9pbnRlclR5cGU6ICdURVNUX1BPSU5URVJfVFlQRScsXG4gIH0gYXMgYW55XG4gIGNvbnN0IHRlc3RFdmVudFByb3AgPSBbJ1RFU1RfRVZFTlRfUFJPUCddXG4gIGNvbnN0IGV2ZW50ID0ge1xuICAgIHRlc3RFdmVudFByb3AsXG4gIH0gYXMgYW55XG4gIGNvbnN0IGludGVyYWN0aW9uID0gbmV3IEludGVyYWN0aW9uKHsgc2lnbmFsczogbmV3IFNpZ25hbHMoKSB9IGFzIGFueSlcbiAgY29uc3QgZXZlbnRUYXJnZXQgPSB7fSBhcyBFbGVtZW50XG4gIGNvbnN0IHBvaW50ZXJFdmVudCA9IG5ldyBQb2ludGVyRXZlbnQodHlwZSwgcG9pbnRlciwgZXZlbnQsIGV2ZW50VGFyZ2V0LCBpbnRlcmFjdGlvbiwgMCkgYXMgYW55XG5cbiAgdC5lcXVhbChwb2ludGVyRXZlbnQudGVzdFBvaW50ZXJQcm9wLCB0ZXN0UG9pbnRlclByb3AsXG4gICAgJ3BvaW50ZXJFdmVudCBpcyBleHRlbmRlZCBmb3JtIHBvaW50ZXInKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC50ZXN0RXZlbnRQcm9wLCB0ZXN0RXZlbnRQcm9wLFxuICAgICdwb2ludGVyRXZlbnQgaXMgZXh0ZW5kZWQgZm9ybSBFdmVudCcpXG5cbiAgdC5lcXVhbChwb2ludGVyRXZlbnQudHlwZSwgdHlwZSxcbiAgICAndHlwZSBpcyBzZXQgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQucG9pbnRlclR5cGUsIHBvaW50ZXJVdGlscy5nZXRQb2ludGVyVHlwZShwb2ludGVyKSxcbiAgICAncG9pbnRlclR5cGUgaXMgc2V0IGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LnBvaW50ZXJJZCwgcG9pbnRlcklkLFxuICAgICdwb2ludGVySWQgaXMgc2V0IGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50Lm9yaWdpbmFsRXZlbnQsIGV2ZW50LFxuICAgICdvcmlnaW5hbEV2ZW50IGlzIHNldCBjb3JyZWN0bHknKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5pbnRlcmFjdGlvbiwgaW50ZXJhY3Rpb24uX3Byb3h5LFxuICAgICdpbnRlcmFjdGlvbiBpcyBzZXQgY29ycmVjdGx5JylcbiAgdC5lcXVhbChwb2ludGVyRXZlbnQudGFyZ2V0LCBldmVudFRhcmdldCxcbiAgICAndGFyZ2V0IGlzIHNldCBjb3JyZWN0bHknKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5jdXJyZW50VGFyZ2V0LCBudWxsLFxuICAgICdjdXJyZW50VGFyZ2V0IGlzIG51bGwnKVxuXG4gIHQuZW5kKClcbn0pXG5cbnRlc3QoJ1BvaW50ZXJFdmVudCBtZXRob2RzJywgKHQpID0+IHtcbiAgY29uc3QgbWV0aG9kQ29udGV4dHMgPSB7fSBhcyBhbnlcbiAgY29uc3QgZXZlbnQ6IGFueSA9IFsncHJldmVudERlZmF1bHQnLCAnc3RvcFByb3BhZ2F0aW9uJywgJ3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiddXG4gICAgLnJlZHVjZSgoYWNjLCBtZXRob2ROYW1lKSA9PiB7XG4gICAgICBhY2NbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7IG1ldGhvZENvbnRleHRzW21ldGhvZE5hbWVdID0gdGhpcyB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgaGVscGVycy5uZXdQb2ludGVyKCkpXG4gIGNvbnN0IHBvaW50ZXJFdmVudCA9IG5ldyBQb2ludGVyRXZlbnQoJ1RFU1QnLCB7fSBhcyBhbnksIGV2ZW50LCBudWxsLCB7fSBhcyBhbnksIDApXG5cbiAgcG9pbnRlckV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgdC5lcXVhbChtZXRob2RDb250ZXh0cy5wcmV2ZW50RGVmYXVsdCwgZXZlbnQsXG4gICAgJ1BvaW50ZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpIGNhbGxzIHByZXZlbnREZWZhdWx0IG9mIG9yaWdpbmFsRXZlbnQnKVxuXG4gIHQubm90T2socG9pbnRlckV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAncHJvcGFnYXRpb25TdG9wcGVkIGlzIGZhbHNlIGJlZm9yZSBjYWxsIHRvIHN0b3BQcm9wYWdhdGlvbicpXG4gIHBvaW50ZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICB0Lm9rKHBvaW50ZXJFdmVudC5wcm9wYWdhdGlvblN0b3BwZWQsXG4gICAgJ3N0b3BQcm9wYWdhdGlvbiBzZXRzIHByb3BhZ2F0aW9uU3RvcHBlZCB0byB0cnVlJylcbiAgdC5lcXVhbChtZXRob2RDb250ZXh0cy5zdG9wUHJvcGFnYXRpb24sIHVuZGVmaW5lZCxcbiAgICAnUG9pbnRlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIGRvZXMgbm90IGNhbGwgc3RvcFByb3BhZ2F0aW9uIG9mIG9yaWdpbmFsRXZlbnQnKVxuXG4gIHQubm90T2socG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAnaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIGlzIGZhbHNlIGJlZm9yZSBjYWxsIHRvIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbicpXG4gIHBvaW50ZXJFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICB0LmVxdWFsKG1ldGhvZENvbnRleHRzLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiwgdW5kZWZpbmVkLFxuICAgICdQb2ludGVyRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgZG9lcyBub3QgY2FsbCBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gb2Ygb3JpZ2luYWxFdmVudCcpXG4gIHQub2socG9pbnRlckV2ZW50LmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCxcbiAgICAnc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIHNldHMgaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIHRvIHRydWUnKVxuXG4gIGNvbnN0IG9yaWdpbiA9IHsgeDogMjAsIHk6IDMwIH1cbiAgcG9pbnRlckV2ZW50Ll9zdWJ0cmFjdE9yaWdpbihvcmlnaW4pXG5cbiAgdC5lcXVhbChwb2ludGVyRXZlbnQucGFnZVgsICAgZXZlbnQucGFnZVggICAtIG9yaWdpbi54LCAnc3VidHJhY3RPcmlnaW4gdXBkYXRlcyBwYWdlWCBjb3JyZWN0bHknKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5wYWdlWSwgICBldmVudC5wYWdlWSAgIC0gb3JpZ2luLnksICdzdWJ0cmFjdE9yaWdpbiB1cGRhdGVzIHBhZ2VZIGNvcnJlY3RseScpXG4gIHQuZXF1YWwocG9pbnRlckV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFggLSBvcmlnaW4ueCwgJ3N1YnRyYWN0T3JpZ2luIHVwZGF0ZXMgY2xpZW50WCBjb3JyZWN0bHknKVxuICB0LmVxdWFsKHBvaW50ZXJFdmVudC5jbGllbnRZLCBldmVudC5jbGllbnRZIC0gb3JpZ2luLnksICdzdWJ0cmFjdE9yaWdpbiB1cGRhdGVzIGNsaWVudFkgY29ycmVjdGx5JylcblxuICBwb2ludGVyRXZlbnQuX2FkZE9yaWdpbihvcmlnaW4pXG4gIHQub2soWydwYWdlWCcsICdwYWdlWScsICdjbGllbnRYJywgJ2NsaWVudFknXS5yZWR1Y2UoKGFsbEVxdWFsLCBwcm9wKSA9PiBhbGxFcXVhbCAmJiBwb2ludGVyRXZlbnRbcHJvcF0gPT09IGV2ZW50W3Byb3BdLCB0cnVlKSxcbiAgICAnYWRkT3JpZ2luIHdpdGggdGhlIHN1YnRyYWN0ZWQgb3JpZ2luIHJldmVydHMgdG8gb3JpZ2luYWwgY29vcmRpbmF0ZXMnKVxuXG4gIHQuZW5kKClcbn0pXG4iXX0=